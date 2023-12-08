import client from "../utils/mongo.js";
import mongodb from "mongodb";

const db = client.db("melo");
const roomCollection = db.collection("rooms");
const userCollection = db.collection("users");

export const create = async (input, userID) => {
  const session = client.startSession();
  session.startTransaction();
  try {
    const room = {
      _id: new mongodb.ObjectId(),
      name: input.name,
      type: input.type,
      description: input.description,
      member_limit: input.member_limit,
      members: [new mongodb.ObjectId(userID)],
      queue: [],
      playlists: [],
      created_at: new Date(),
    };
    const result = await roomCollection.insertOne(room, { session });
    await userCollection.updateOne(
      { _id: new mongodb.ObjectId(userID) },
      { $addToSet: { rooms: room._id } },
      { session }
    );
    await session.commitTransaction();
    session.endSession();
    return result.insertedId;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

export const getRoom = async (roomID) => {
  try {
    // check if room exists
    const id = new mongodb.ObjectId(roomID);
    const room = await roomCollection.findOne({ _id: id });
    if (!room) {
      throw new Error("Room not found!");
    }
    return room;
  } catch (err) {
    throw err;
  }
};

export const getRooms = async () => {
  try {
    const rooms = await roomCollection.find().toArray();
    return rooms;
  } catch (err) {
    throw err;
  }
};

export const getRoomsByUser = async (userID) => {
  try {
    const id = new mongodb.ObjectId(userID);
    const user = await userCollection.findOne({ _id: id });
    if (!user) {
      throw new Error("User not found!");
    }
    const rooms = await roomCollection
      .find({ _id: { $in: user.rooms } })
      .toArray();
    return rooms;
  } catch (err) {
    throw err;
  }
};

export const join = async (roomID, userID) => {
  const session = client.startSession();
  session.startTransaction();
  try {
    const result = await roomCollection.updateOne(
      { _id: new mongodb.ObjectId(roomID) },
      { $addToSet: { members: new mongodb.ObjectId(userID) } },
      { session }
    );
    if (result.matchedCount === 0) {
      throw new Error("Room not found!");
    }
    const userResult = await userCollection.updateOne(
      { _id: new mongodb.ObjectId(userID) },
      { $addToSet: { rooms: new mongodb.ObjectId(roomID) } },
      { session }
    );
    if (userResult.matchedCount === 0) {
      throw new Error("User not found!");
    }
    await session.commitTransaction();
    return result.modifiedCount;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  }
};

export const leave = async (roomID, userID) => {
  const session = client.startSession();
  session.startTransaction();
  try {
    const result = await roomCollection.updateOne(
      { _id: new mongodb.ObjectId(roomID) },
      { $pull: { members: new mongodb.ObjectId(userID) } },
      { session }
    );
    if (result.matchedCount === 0) {
      throw new Error("Room not found!");
    }
    const userResult = await userCollection.updateOne(
      { _id: new mongodb.ObjectId(userID) },
      { $pull: { rooms: new mongodb.ObjectId(roomID) } },
      { session }
    );
    if (userResult.matchedCount === 0) {
      throw new Error("User not found!");
    }
    await session.commitTransaction();
    return result.modifiedCount;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  }
}

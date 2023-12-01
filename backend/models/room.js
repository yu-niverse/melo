import client from "../utils/mongo.js";
import mongodb from "mongodb";

const db = client.db("melo");
const roomCollection = db.collection("rooms");
const userCollection = db.collection("users");

export const create = async (input) => {
  try {
    const room = {
      _id: new mongodb.ObjectId(),
      name: input.name,
      type: input.type,
      description: input.description,
      member_limit: input.member_limit,
      members: [],
      created_at: new Date(),
    };
    const result = await roomCollection.insertOne(room, { session });
    return result.insertedId;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getRoom = async (roomID) => {
  try {
    // check if room exists
    const room = await roomCollection.findOne({ _id: roomID });
    if (!room) {
      throw new Error("Room not found!");
    }
    return room;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getRooms = async () => {
  try {
    const rooms = await roomCollection.find().toArray();
    return rooms;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getRoomsByUser = async (userID) => {
  try {
    const user = await userCollection.findOne({ _id: userID });
    if (!user) {
      throw new Error("User not found!");
    }
    const rooms = await roomCollection
      .find({ _id: { $in: user.rooms } })
      .toArray();
    return rooms;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getPublic = async () => {
  try {
    const rooms = await roomCollection.find({ type: "public" }).toArray();
    return rooms;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export const deleteRoom = async (roomID) => {
  try {
    // check if room exists
    const room = await roomCollection.findOne({ _id: roomID });
    if (!room) {
      throw new Error("Room not found!");
    }
    client.startSession();
    session.startTransaction();
    // delete room
    await roomCollection.deleteOne({ _id: roomID }, { session });
    // delete room from users
    await userCollection.updateMany(
      { $in: { rooms: roomID } },
      { $pull: { rooms: roomID } },
      { session }
    );
    await session.commitTransaction();
    session.endSession();
    return room;
  } catch (err) {
    console.log(err);
    session.abortTransaction();
    throw err;
  }
}

export const updateRoom = async (roomID, input) => {
  try {
    const result = await roomCollection.updateOne(
      { _id: roomID },
      { $set: input }
    );
    if (result.matchedCount === 0) {
      throw new Error("Room not found!");
    }
    return result.modifiedCount;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export const join = async (roomID, userID) => {
  const session = client.startSession();
  session.startTransaction();
  try {
    const result = await roomCollection.updateOne(
      { _id: roomID },
      { $addToSet: { members: userID } },
      { session }
    );
    if (result.matchedCount === 0) {
      throw new Error("Room not found!");
    }
    const userResult = await userCollection.updateOne(
      { _id: userID },
      { $addToSet: { rooms: roomID } },
      { session }
    );
    if (userResult.matchedCount === 0) {
      throw new Error("User not found!");
    }
    await session.commitTransaction();
    return result.modifiedCount;
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    throw err;
  }
};

export const leave = async (roomID, userID) => {
  const session = client.startSession();
  session.startTransaction();
  try {
    const result = await roomCollection.updateOne(
      { _id: roomID },
      { $pull: { members: userID } },
      { session }
    );
    if (result.matchedCount === 0) {
      throw new Error("Room not found!");
    }
    const userResult = await userCollection.updateOne(
      { _id: userID },
      { $pull: { rooms: roomID } },
      { session }
    );
    if (userResult.matchedCount === 0) {
      throw new Error("User not found!");
    }
    await session.commitTransaction();
    return result.modifiedCount;
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    throw err;
  }
}

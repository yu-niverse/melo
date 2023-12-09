import client from "../utils/mongo.js";
import mongodb from "mongodb";

const db = client.db("melo");
const userCollection = db.collection("users");
const roomCollection = db.collection("rooms");
const songCollection = db.collection("songs");

export const add = async (name, artist, url) => {
  try {
    const song = {
      _id: new mongodb.ObjectId(),
      name: name,
      artist: artist,
      url: url,
      created_at: new Date(),
    };
    const result = await songCollection.insertOne(song);
    return result.insertedId;
  } catch (err) {
    throw err;
  }
};

export const getSongs = async () => {
  try {
    const songs = await songCollection.find().toArray();
    return songs;
  } catch (err) {
    throw err;
  }
};

export const getSong = async (songID) => {
  try {
    const song = await songCollection.findOne({ _id: new mongodb.ObjectId(songID) });
    if (!song) {
      throw new Error("Song not found!");
    }
    return song;
  } catch (err) {
    throw err;
  }
};

export const addToQueue = async (userID, songID, roomID) => {
  try {
    const user = await userCollection.findOne({ _id: new mongodb.ObjectId(userID) });
    if (!user) {
      throw new Error("User not found!");
    }
    const song = await songCollection.findOne({ _id: new mongodb.ObjectId(songID) });
    if (!song) {
      throw new Error("Song not found!");
    }
    const room = await roomCollection.findOneAndUpdate(
      { _id: new mongodb.ObjectId(roomID) },
      {
        $push: {
          queue: {
            id: new mongodb.ObjectId(songID),
            added_by: user.username,
          },
        },
      }
    );
    if (!room) {
      throw new Error("Room not found!");
    }
    return room._id;
  } catch (err) {
    throw err;
  }
};

export const getQueue = async (roomID) => {
  try {
    const room = await roomCollection.findOne({ _id: new mongodb.ObjectId(roomID) });
    if (!room) {
      throw new Error("Room not found!");
    }
    const queue = await songCollection
      .find({ _id: { $in:  room.queue.map((song) => new mongodb.ObjectId(song.id)) }})
      .toArray();
    return queue;
  } catch (err) {
    throw err;
  }
};

export const clearQueue = async (roomID) => {
  try {
    const room = await roomCollection.findOneAndUpdate(
      { _id: new mongodb.ObjectId(roomID) },
      { $set: { queue: [] } }
    );
    if (!room) {
      throw new Error("Room not found!");
    }
    return room._id;
  } catch (err) {
    throw err;
  }
};

export const updateQueue = async (queue, roomID) => {
  try {
    const room = await roomCollection.findOneAndUpdate(
      { _id: new mongodb.ObjectId(roomID) },
      { $set: { queue: queue } }
    );
    if (!room) {
      throw new Error("Room not found!");
    }
    return room._id;
  } catch (err) {
    throw err;
  }
};

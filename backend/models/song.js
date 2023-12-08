import client from "../utils/mongo.js";
import mongodb from "mongodb";

const db = client.db("melo");
const roomCollection = db.collection("rooms");
const songCollection = db.collection("songs");

export const add = async (input) => {
  try {
    const song = {
      _id: new mongodb.ObjectId(),
      name: input.name,
      artist: input.artist,
      url: input.url,
      created_at: new Date(),
    };
    const result = await songCollection.insertOne(song);
    return result.insertedId;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getSongs = async () => {
  try {
    const songs = await songCollection.find().toArray();
    return songs;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getSong = async (songID) => {
  try {
    const song = await songCollection.findOne({ _id: songID });
    if (!song) {
      throw new Error("Song not found!");
    }
    return song;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deleteSong = async (songID) => {
  try {
    const result = await songCollection.deleteOne({ _id: songID });
    if (result.deletedCount === 0) {
      throw new Error("Song not found!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const addToQueue = async (songID, roomID) => {
  try {
    const room = await roomCollection.findOneAndUpdate(
      { _id: roomID },
      { $push: { queue: songID } }
    );
    if (!room.value) {
      throw new Error("Room not found!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const removeFromQueue = async (songID, roomID) => {
  try {
    const room = await roomCollection.findOneAndUpdate(
      { _id: roomID },
      { $pull: { queue: songID } }
    );
    if (!room.value) {
      throw new Error("Room not found!");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getQueue = async (roomID) => {
  try {
    const room = await roomCollection.findOne({ _id: roomID });
    if (!room) {
      throw new Error("Room not found!");
    }
    const queue = await songCollection
      .find({ _id: { $in: room.queue } })
      .toArray();
    return queue;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const clearQueue = async (roomID) => {
  try {
    const room = await roomCollection.findOneAndUpdate(
      { _id: roomID },
      { $set: { queue: [] } }
    );
    if (!room.value) {
      throw new Error("Room not found!");
    }
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

export const updateQueue = async (queue, roomID) => {
  try {
    const room = await roomCollection.findOneAndUpdate(
      { _id: roomID },
      { $set: { queue: queue } }
    );
    if (!room.value) {
      throw new Error("Room not found!");
    }
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}

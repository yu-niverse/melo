import room from "../routes/room.js";
import client from "../utils/mongo.js";

const db = client.db("melo");
const roomCollection = db.collection("rooms");

export const create = async (roomID, input) => {
  try {
    const room = await roomCollection.findOneAndUpdate(
      { _id: roomID },
      { $push: { Playlists: input } }
    );
    if (!room) {
      throw new Error("Room not found!");
    }
    return room;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getPlaylists = async (roomID) => {
  try {
    const room = await roomCollection.findOne({ _id: roomID });
    if (!room) {
      throw new Error("Room not found!");
    }
    return room.Playlists;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getPlaylist = async (roomID, playlistID) => {
  try {
    const room = await roomCollection.findOne({ _id: roomID });
    if (!room) {
      throw new Error("Room not found!");
    }
    const playlist = await room.Playlists.findOne({ _id: playlistID });
    if (!playlist) {
      throw new Error("Playlist not found!");
    }
    return playlist;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const deletePlaylist = async (roomID, playlistID) => {
  try {
    const room = await roomCollection.findOne({ _id: roomID });
    if (!room) {
      throw new Error("Room not found!");
    }
    const playlist = await room.Playlists.findOne({ _id: playlistID });
    if (!playlist) {
      throw new Error("Playlist not found!");
    }
    await roomCollection.updateOne(
      { _id: roomID },
      { $pull: { Playlists: { _id: playlistID } } }
    );
    return playlistID;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const updatePlaylist = async (roomID, playlistID, input) => {
  try {
    const room = await roomCollection.findOne({ _id: roomID });
    if (!room) {
      throw new Error("Room not found!");
    }
    const playlist = await room.Playlists.findOne({ _id: playlistID });
    if (!playlist) {
      throw new Error("Playlist not found!");
    }
    await roomCollection.updateOne(
      { _id: roomID, "Playlists._id": playlistID },
      { $set: { "Playlists.$": input } }
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const addSong = async (roomID, playlistID, songID) => {
  try {
    const room = await roomCollection.findOne({ _id: roomID });
    if (!room) {
      throw new Error("Room not found!");
    }
    const playlist = await room.Playlists.findOne({ _id: playlistID });
    if (!playlist) {
      throw new Error("Playlist not found!");
    }
    await roomCollection.updateOne(
      { _id: roomID, "Playlists.$._id": playlistID },
      { $push: { "Playlists.$.songs": songID } }
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const removeSong = async (roomID, playlistID, songID) => {
  try {
    const room = await roomCollection.findOne({ _id: roomID });
    if (!room) {
      throw new Error("Room not found!");
    }
    const playlist = await room.Playlists.findOne({ _id: playlistID });
    if (!playlist) {
      throw new Error("Playlist not found!");
    }
    await roomCollection.updateOne(
      { _id: roomID, "Playlists.$._id": playlistID },
      { $pull: { "Playlists.$.songs": songID } }
    );
  } catch (err) {
    console.log(err);
    throw err;
  }
};

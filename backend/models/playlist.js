import client from "../utils/mongo.js";
import mongodb from "mongodb";

const db = client.db("melo");
const userCollection = db.collection("users");
const roomCollection = db.collection("rooms");

export const create = async (roomID, userID) => {
  try {
    const user = await userCollection.findOne({
      _id: new mongodb.ObjectId(userID),
    });
    if (!user) {
      throw new Error("User not found!");
    }
    const room = await roomCollection.findOneAndUpdate(
      { _id: new mongodb.ObjectId(roomID) },
      {
        $push: {
          playlists: {
            _id: new mongodb.ObjectId(),
            name: "New Playlist",
            songs: [],
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

export const getPlaylists = async (roomID) => {
  try {
    const room = await roomCollection.findOne({
      _id: new mongodb.ObjectId(roomID),
    });
    if (!room) {
      throw new Error("Room not found!");
    }
    return room.playlists;
  } catch (err) {
    throw err;
  }
};

export const getPlaylist = async (roomID, playlistID) => {
  try {
    const room = await roomCollection.findOne({
      _id: new mongodb.ObjectId(roomID),
    });
    if (!room) {
      throw new Error("Room not found!");
    }
    const playlist = await room.playlists.find((item) =>
      item._id.equals(new mongodb.ObjectId(playlistID))
    );
    if (!playlist) {
      throw new Error("Playlist not found!");
    }
    return playlist;
  } catch (err) {
    throw err;
  }
};

export const updatePlaylist = async (roomID, playlistID, name) => {
  try {
    const room = await roomCollection.findOne({
      _id: new mongodb.ObjectId(roomID),
    });
    if (!room) {
      throw new Error("Room not found!");
    }
    const playlist = await room.playlists.find((item) =>
      item._id.equals(new mongodb.ObjectId(playlistID))
    );
    if (!playlist) {
      throw new Error("Playlist not found!");
    }
    await roomCollection.updateOne(
      {
        _id: new mongodb.ObjectId(roomID),
        "playlists._id": new mongodb.ObjectId(playlistID),
      },
      { $set: { "playlists.$.name": name } }
    );
    return playlistID;
  } catch (err) {
    throw err;
  }
};

export const deletePlaylist = async (roomID, playlistID) => {
  try {
    const room = await roomCollection.findOne({
      _id: new mongodb.ObjectId(roomID),
    });
    if (!room) {
      throw new Error("Room not found!");
    }
    const playlist = await room.playlists.find((item) =>
      item._id.equals(new mongodb.ObjectId(playlistID))
    );
    if (!playlist) {
      throw new Error("Playlist not found!");
    }
    await roomCollection.updateOne(
      { _id: new mongodb.ObjectId(roomID) },
      { $pull: { playlists: { _id: new mongodb.ObjectId(playlistID) } } }
    );
    return playlistID;
  } catch (err) {
    throw err;
  }
};

export const addSong = async (userID, roomID, playlistID, songID) => {
  try {
    const user = await userCollection.findOne({
      _id: new mongodb.ObjectId(userID),
    });
    if (!user) {
      throw new Error("User not found!");
    }
    const room = await roomCollection.findOne({
      _id: new mongodb.ObjectId(roomID),
    });
    if (!room) {
      throw new Error("Room not found!");
    }
    const playlist = await room.playlists.find((item) =>
      item._id.equals(new mongodb.ObjectId(playlistID))
    );
    if (!playlist) {
      throw new Error("Playlist not found!");
    }
    await roomCollection.updateOne(
      {
        _id: new mongodb.ObjectId(roomID),
        "playlists._id": new mongodb.ObjectId(playlistID),
      },
      {
        $push: {
          "playlists.$.songs": {
            id: new mongodb.ObjectId(songID),
            added_by: user.username,
          },
        },
      }
    );
    return playlistID;
  } catch (err) {
    throw err;
  }
};

export const removeSong = async (roomID, playlistID, songID) => {
  try {
    const room = await roomCollection.findOne({
      _id: new mongodb.ObjectId(roomID),
    });
    if (!room) {
      throw new Error("Room not found!");
    }
    const playlist = await room.playlists.find((item) =>
      item._id.equals(new mongodb.ObjectId(playlistID))
    );
    if (!playlist) {
      throw new Error("Playlist not found!");
    }
    await roomCollection.updateOne(
      {
        _id: new mongodb.ObjectId(roomID),
        "playlists._id": new mongodb.ObjectId(playlistID),
      },
      {
        $pull: {
          "playlists.$.songs": {
            id: new mongodb.ObjectId(songID),
          },
        },
      }
    );
    return playlistID;
  } catch (err) {
    throw err;
  }
};

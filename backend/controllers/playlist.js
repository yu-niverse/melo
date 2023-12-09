import * as Playlist from "../models/playlist.js";

export const createPlaylist = async (req, res) => {
  try {
    const { roomID } = req.params;
    const playlist = await Playlist.create(roomID, req.user.userID);
    res.status(200).json({
      data: playlist,
    });
  } catch (err) {
    console.log(err);
    if (err.message === "Room not found!") { 
      return res.status(400).send(err.message);
    }
    res.status(500).json({ error: err });
  }
};

export const getPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.getPlaylists(req.params.roomID);
    res.status(200).json({
      data: playlists,
    });
  } catch (err) {
    console.log(err);
    if (err.message === "Room not found!") {
      return res.status(400).send(err.message);
    }
    res.status(500).json({ error: err });
  }
};

export const getPlaylist = async (req, res) => {
  try {
    const { roomID, listID } = req.params;
    const playlist = await Playlist.getPlaylist(roomID, listID);
    res.status(200).json({
      data: playlist,
    });
  } catch (err) {
    console.log(err);
    if (err.message === "Room not found!") {
      return res.status(400).send(err.message);
    }
    if (err.message === "Playlist not found!") {
      return res.status(400).send(err.message);
    }
    res.status(500).json({ error: err });
  }
};

export const updatePlaylist = async (req, res) => {
  try {
    const { roomID, listID } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(400).send("Name is required");
    }
    const playlist = await Playlist.updatePlaylist(roomID, listID, name);
    res.status(200).json({
      data: playlist,
    });
  } catch (err) {
    console.log(err);
    if (err.message === "Room not found!") {
      return res.status(400).send(err.message);
    }
    if (err.message === "Playlist not found!") {
      return res.status(400).send(err.message);
    }
    res.status(500).json({ error: err });
  }
};

export const deletePlaylist = async (req, res) => {
  try {
    const { roomID, listID } = req.params;
    await Playlist.deletePlaylist(roomID, listID);
    res.status(200).json({
      data: "Playlist deleted!",
    });
  } catch (err) {
    console.log(err);
    if (err.message === "Room not found!") {
      return res.status(400).send(err.message);
    }
    if (err.message === "Playlist not found!") {
      return res.status(400).send(err.message);
    }
    res.status(500).json({ error: err });
  }
};

export const addSong = async (req, res) => {
  try {
    const { roomID, listID, songID } = req.params;
    const playlist = await Playlist.addSong(req.user.userID, roomID, listID, songID);
    res.status(200).json({
      data: playlist,
    });
  } catch (err) {
    console.log(err);
    if (err.message === "User not found!") {
      return res.status(400).send(err.message);
    }
    if (err.message === "Room not found!") {
      return res.status(400).send(err.message);
    }
    if (err.message === "Playlist not found!") {
      return res.status(400).send(err.message);
    }
    if (err.message === "Song not found!") {
      return res.status(400).send(err.message);
    }
    res.status(500).json({ error: err });
  }
}

export const removeSong = async (req, res) => {
  try {
    const { roomID, listID, songID } = req.params;
    const playlist = await Playlist.removeSong(roomID, listID, songID);
    res.status(200).json({
      data: playlist,
    });
  } catch (err) {
    console.log(err);
    if (err.message === "Room not found!") {
      return res.status(400).send(err.message);
    }
    if (err.message === "Playlist not found!") {
      return res.status(400).send(err.message);
    }
    if (err.message === "Song not found!") {
      return res.status(400).send(err.message);
    }
    res.status(500).json({ error: err });
  }
}



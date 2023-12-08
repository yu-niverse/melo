import * as Playlist from "../models/playlist";

export const createPlaylist = async (req, res) => {
  try {
    const { roomID } = req.params;
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).send("All fields are required");
    }
    const playlist = await Playlist.create(roomID, { name, description });
    res.status(200).json({
      data: playlist,
    });
  } catch (err) {
    console.log(err);
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
      return res.status(404).send(err.message);
    }
    res.status(500).json({ error: err });
  }
};

export const getPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.getPlaylist(
      req.params.roomID,
      req.params.playlistID
    );
    res.status(200).json({
      data: playlist,
    });
  } catch (err) {
    console.log(err);
    if (err.message === "Room not found!") {
      return res.status(404).send(err.message);
    }
    if (err.message === "Playlist not found!") {
      return res.status(404).send(err.message);
    }
    res.status(500).json({ error: err });
  }
};

export const deletePlaylist = async (req, res) => {
  try {
    const { roomID, playlistID } = req.params;
    await Playlist.deletePlaylist(roomID, playlistID);
    res.status(200).json({
      data: "Playlist deleted!",
    });
  } catch (err) {
    console.log(err);
    if (err.message === "Room not found!") {
      return res.status(404).send(err.message);
    }
    if (err.message === "Playlist not found!") {
      return res.status(404).send(err.message);
    }
    res.status(500).json({ error: err });
  }
};

export const updatePlaylist = async (req, res) => {
  try {
    const { roomID, playlistID } = req.params;
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).send("All fields are required");
    }
    const playlist = await Playlist.updatePlaylist(roomID, playlistID, {
      name,
      description,
    });
    res.status(200).json({
      data: playlist,
    });
  } catch (err) {
    console.log(err);
    if (err.message === "Room not found!") {
      return res.status(404).send(err.message);
    }
    if (err.message === "Playlist not found!") {
      return res.status(404).send(err.message);
    }
    res.status(500).json({ error: err });
  }
};

export const addSong = async (req, res) => {
  try {
    const { roomID, playlistID, songID } = req.params;
    if (!songID) {
      return res.status(400).send("Song ID is required");
    }
    const playlist = await Playlist.addSong(roomID, playlistID, songID);
    res.status(200).json({
      data: playlist,
    });
  } catch (err) {
    console.log(err);
    if (err.message === "Room not found!") {
      return res.status(404).send(err.message);
    }
    if (err.message === "Playlist not found!") {
      return res.status(404).send(err.message);
    }
    res.status(500).json({ error: err });
  }
}

export const removeSong = async (req, res) => {
  try {
    const { roomID, playlistID, songID } = req.params;
    if (!songID) {
      return res.status(400).send("Song ID is required");
    }
    const playlist = await Playlist.removeSong(roomID, playlistID, songID);
    res.status(200).json({
      data: playlist,
    });
  } catch (err) {
    console.log(err);
    if (err.message === "Room not found!") {
      return res.status(404).send(err.message);
    }
    if (err.message === "Playlist not found!") {
      return res.status(404).send(err.message);
    }
    res.status(500).json({ error: err });
  }
}



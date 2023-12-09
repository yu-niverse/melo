import * as Song from "../models/song.js";

export const uploadSong = async (req, res) => {
  try {
    const { name, artist } = req.body;
    const song = await Song.add(name, artist, req.file.location);
    res.status(200).json({
      data: song,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export const getSongs = async (req, res) => {
  try {
    const songs = await Song.getSongs();
    res.status(200).json({
      data: songs,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export const getSong = async (req, res) => {
  try {
    const song = await Song.getSong(req.params.songID);
    res.status(200).json({
      data: song,
    });
  } catch (err) {
    if (err.message === "Song not found!") {
      return res.status(400).send(err.message);
    }
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export const addToQueue = async (req, res) => {
  try {
    const room = await Song.addToQueue(
      req.user.userID,
      req.params.songID,
      req.params.roomID
    );
    res.status(200).json({
      data: room,
    });
  } catch (err) {
    console.log(err);
    if (err.message === "User not found!") {
      return res.status(400).send(err.message);
    }
    if (err.message === "Room not found!") {
      return res.status(400).send(err.message);
    }
    if (err.message === "Song not found!") {
      return res.status(400).send(err.message);
    }
    res.status(500).json({ error: err });
  }
};

export const removeFromQueue = async (req, res) => {
  try {
    const room = await Song.removeFromQueue(req.params.songID, req.params.roomID);
    res.status(200).json({
      data: room,
    });
  } catch (err) {
    console.log(err);
    if (err.message === "Room not found!") {
      return res.status(400).send(err.message);
    }
    if (err.message === "Song not found!") {
      return res.status(400).send(err.message);
    }
    res.status(500).json({ error: err });
  }
};

export const getQueue = async (req, res) => {
  try {
    const queue = await Song.getQueue(req.params.roomID);
    res.status(200).json({
      data: queue,
    });
  } catch (err) {
    console.log(err);
    if (err.message === "Room not found!") {
      return res.status(400).send(err.message);
    }
    res.status(500).json({ error: err });
  }
}

export const clearQueue = async (req, res) => {
  try {
    const room = await Song.clearQueue(req.params.roomID);
    res.status(200).json({
      data: room,
    });
  } catch (err) {
    console.log(err);
    if (err.message === "Room not found!") {
      return res.status(400).send(err.message);
    }
    res.status(500).json({ error: err });
  }
}

export const updateQueue = async (req, res) => {
  try {
    const { queue } = req.body;
    const room = await Song.updateQueue(queue, req.params.roomID);
    res.status(200).json({
      data: room,
    });
  } catch (err) {
    console.log(err);
    if (err.message === "Room not found!") {
      return res.status(400).send(err.message);
    }
    res.status(500).json({ error: err });
  }
}

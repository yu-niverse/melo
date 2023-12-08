import * as Song from "../models/song.js";

export const uploadSong = async (req, res) => {
  try {
    const song = await Song.createSong(req.file);
    res.send(song);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export const getSongs = async (req, res) => {
  try {
    const songs = await Song.getSongs();
    res.send(songs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export const getSong = async (req, res) => {
  try {
    const song = await Song.getSong(req.params.songID);
    res.send(song);
  } catch (err) {
    if (err.message === "Song not found!") {
      return res.status(404).send(err.message);
    }
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export const deleteSong = async (req, res) => {
  try {
    await Song.deleteSong(req.params.songID);
    res.send("Song deleted!");
  } catch (err) {
    if (err.message === "Song not found!") {
      return res.status(404).send(err.message);
    }
    console.log(err);
    res.status(500).json({ error: err });
  }
};

import express from "express";
import { authentication } from "../utils/auth.js";
import { createPlaylist, getPlaylists, getPlaylist, deletePlaylist, updatePlaylist, addSong, removeSong } from "../controllers/playlist.js";

const playlist = express.Router();

// Playlists API
playlist.use(express.json());
playlist.use(authentication);
playlist.post("/", createPlaylist);
playlist.get("/", getPlaylists);
playlist.get("/:roomID/:playlistID", getPlaylist);
playlist.delete("/:roomID/:playlistID", deletePlaylist);
playlist.put("/:roomID/:playlistID", updatePlaylist);
playlist.post("/:roomID/:playlistID/:songID", addSong);
playlist.delete("/:roomID/:playlistID/:songID", removeSong);
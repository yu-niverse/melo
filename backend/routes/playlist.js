import express from "express";
import { authentication } from "../utils/auth.js";
import { createPlaylist, getPlaylists, getPlaylist, deletePlaylist, updatePlaylist, addSong, removeSong } from "../controllers/playlist.js";

const playlist = express.Router();

// Playlists API
playlist.use(express.json());
playlist.use(authentication);
playlist.get("/room/:roomID", getPlaylists);
playlist.post("/room/:roomID", createPlaylist);
playlist.get("/:roomID/:listID", getPlaylist);
playlist.put("/:roomID/:listID", updatePlaylist);
playlist.delete("/:roomID/:listID", deletePlaylist);
playlist.post("/:roomID/:listID/:songID", addSong);
playlist.delete("/:roomID/:listID/:songID", removeSong);

export default playlist;
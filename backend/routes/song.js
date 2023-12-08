import express from 'express';
import { uploadAudio } from '../utils/upload.js';
import { uploadSong, getSongs, getSong, deleteSong } from '../controllers/song.js';

const song = express.Router();

// Songs API
song.use(express.json());
song.post('/', uploadAudio.single('audio'), (req, res) => {
  if (!req.file) return res.status(400).send('Audio is required');
  uploadSong(req, res);
});
song.get('/', getSongs);
song.get('/:songID', getSong);
song.delete('/:songID', deleteSong);

export default song;
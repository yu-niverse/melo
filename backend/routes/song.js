import express from 'express';
import { authentication } from '../utils/auth.js';
import { uploadAudio } from '../utils/upload.js';
import { uploadSong, getSongs, getSong } from '../controllers/song.js';
import { addToQueue, removeFromQueue, getQueue, clearQueue, updateQueue } from '../controllers/song.js';

const song = express.Router();

// Songs API
song.use(express.json());
song.post('/', uploadAudio.single('audio'), (req, res) => {
  if (!req.file) return res.status(400).send('Audio is required');
  uploadSong(req, res);
});
song.get('/', getSongs);
song.use(authentication);
song.get('/:songID', getSong);
song.post('/queue/:roomID/:songID', addToQueue);
song.get('/queue/:roomID', getQueue);
song.delete('/queue/:roomID', clearQueue);
song.put('/queue/:roomID', updateQueue);

export default song;
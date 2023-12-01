import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';

const app = express();
app.use(cors());

const port = 4000;
const server = http.createServer(app);

const _path = ffmpegInstaller.path;
ffmpeg.setFfmpegPath(_path);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('user connected');
  console.log(socket.id);

  const musicPath = '/Users/chiehyu/Desktop/melo/backend/public/test.mp3';
  ffmpeg(musicPath, { timeout: 432000 }).addOptions([
    '-profile:v baseline',
    '-level 3.0',
    '-start_number 0',
    '-hls_time 10',
    '-hls_list_size 0',
    '-f hls',
  ]).output('./public/hls.m3u8').on('end', () => {
    console.log('end');
  }).run();

  socket.emit('playAudio', '/hls.m3u8');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.use('/', express.static('public'));

app.get("/healthcheck", (req, res) => {
  res.send("Healthcheck OK!");
});

server.listen(port, () => {
  console.log(`Server listening on ${port} ...`);
});
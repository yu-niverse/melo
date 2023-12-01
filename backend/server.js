import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
import user from './routes/user.js';
import { connect, close } from './utils/mongo.js';

dotenv.config();
const app = express();
app.use(cors());
const port = process.env.PORT;
const server = http.createServer(app);

async function init() {
  try {
    await connect();
    console.log('Server started, MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

async function terminate() {
  try {
    await close();
    console.log('MongoDB connection closed, server stopped');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  } finally {
    process.exit(0);
  }
}

await init();
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

app.use("/user", user);


process.on('SIGINT', terminate);
process.on('SIGTERM', terminate);

server.listen(port, () => {
  console.log(`Server listening on ${port} ...`);
});
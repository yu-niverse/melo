import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
// import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
// import ffmpeg from "fluent-ffmpeg";
import user from "./routes/user.js";
import room from "./routes/room.js";
import playlist from "./routes/playlist.js";
import song from "./routes/song.js";
import { connect, close } from "./utils/mongo.js";

dotenv.config();
const app = express();
app.use(cors());
const port = process.env.PORT;
const server = http.createServer(app);

async function init() {
  try {
    await connect();
    console.log("Server started, MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

async function terminate() {
  try {
    await close();
    console.log("MongoDB connection closed, server stopped");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
  } finally {
    process.exit(0);
  }
}

// await init();
// const _path = ffmpegInstaller.path;
// ffmpeg.setFfmpegPath(_path);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("user connected");
  console.log(socket.id);

  socket.on("joinRoom", (roomId) => {
    console.log("user joined room " + roomId)
    socket.join(roomId);
  });

  socket.on("leaveRoom", (roomId) => {
    console.log("user left room " + roomId)
    socket.leave(roomId);
  });

  socket.on("load", (roomId, song) => {

    console.log("load " + song.name + " in room " + roomId)
    io.to(roomId).emit("play", song);
    // const filename = song.name.replace(/[^a-zA-Z0-9]/g, '');
    // ffmpeg(song.url, { timeout: 432000 })
    //   .addOptions([
    //     "-profile:v baseline",
    //     "-level 3.0",
    //     "-start_number 0",
    //     "-hls_time 10",
    //     "-hls_list_size 0",
    //     "-f hls",
    //   ])
    //   .output("./public/" + filename + ".m3u8")
    //   .on("end", () => {
    //     console.log("loaded " + song.name + " in room " + roomId);
    //     io.to(roomId).emit("play", song, "/" + filename + ".m3u8");
    //   })
    //   .run();
  });

  socket.on("play", (roomId, song, position) => {
    console.log("play " + song.name + " in room " + roomId);
    const filename = song.name.replace(/[^a-zA-Z0-9]/g, '');
    io.to(roomId).emit("play", song, "/" + filename + ".m3u8", position);
  });

  socket.on("pause", (roomId, song) => {
    console.log("pause " + song.name + " in room " + roomId);
    io.to(roomId).emit("pause", song);
  });

  socket.on("seek", (roomId, position) => {
    console.log("seek " + position + " in room " + roomId);
    io.to(roomId).emit("seek", position);
  });
});

// Middleware
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

app.use("/", express.static("public"));

app.get("/healthcheck", (req, res) => {
  res.send("Healthcheck OK!");
});

app.use("/user", user);
app.use("/room", room);
app.use("/list", playlist);
app.use("/song", song);

process.on("SIGINT", terminate);
process.on("SIGTERM", terminate);

server.listen(port, () => {
  console.log(`Server listening on ${port} ...`);
});

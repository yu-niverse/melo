import * as Room from "../models/room.js";

export const createRoom = async (req, res) => {
  try {
    const { name, type, description, member_limit } = req.body;
    if (!name || !type || !description || !member_limit) {
      return res.status(400).send("All fields are required");
    }
    const room = await Room.create(req.body, req.user.userID);
    res.status(200).json({
      data: room,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export const getRoom = async (req, res) => {
  try {
    const room = await Room.getRoom(req.params.roomID);
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
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.getRooms();
    res.status(200).json({
      data: rooms,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export const getRoomsByUser = async (req, res) => {
  try {
    const rooms = await Room.getRoomsByUser(req.user.userID);
    res.status(200).json({
      data: rooms,
    });
  } catch (err) {
    console.log(err);
    if (err.message === "User not found!") {
      return res.status(400).send(err.message);
    }
    res.status(500).json({ error: err });
  }
};

export const joinRoom = async (req, res) => {
  try {
    const room = await Room.join(req.params.roomID, req.user.userID);
    if (room === 0) {
      return res.status(400).send("User is already in the room!");
    }
    res.status(200).json({
      data: room,
    });
  } catch (err) {
    if (err.message === "Room not found!") {
      return res.status(400).send(err.message);
    }
    if (err.message === "User not found!") {
      return res.status(400).send(err.message);
    }
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export const leaveRoom = async (req, res) => {
  try {
    const room = await Room.leave(req.params.roomID, req.user.userID);
    if (room === 0) {
      return res.status(400).send("User is not in the room!");
    }
    res.status(200).json({
      data: room,
    });
  } catch (err) {
    if (err.message === "Room not found!") {
      return res.status(400).send(err.message);
    }
    if (err.message === "User not found!") {
      return res.status(400).send(err.message);
    }
    console.log(err);
    res.status(500).json({ error: err });
  }
};

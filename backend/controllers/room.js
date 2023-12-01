import * as Room from "../models/room.js";

export const createRoom = async (req, res) => {
  try {
    const { name, type, member_limit } = req.body;
    if (!name || !type || !description || !member_limit) {
      return res.status(400).send("All fields are required");
    }
    const room = await Room.create(room);
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
    res.status(500).json({ error: err });
  }
};

export const getPublicRooms = async (req, res) => {
  try {
    const rooms = await Room.getPublic();
    res.status(200).json({
      data: rooms,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.deleteRoom(req.params.roomID);
    res.status(200).json({
      data: room,
    });
  } catch (err) {
    if (err.message === "Room not found!") {
      return res.status(404).send(err.message);
    }
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const room = await Room.updateRoom(req.params.roomID, req.body);
    res.status(200).json({
      data: room,
    });
  } catch (err) {
    if (err.message === "Room not found!") {
      return res.status(404).send(err.message);
    }
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export const joinRoom = async (req, res) => {
  try {
    const room = await Room.joinRoom(req.params.roomID, req.user.userID);
    res.status(200).json({
      data: room,
    });
  } catch (err) {
    if (err.message === "Room not found!") {
      return res.status(404).send(err.message);
    }
    if (err.message === "User not found!") {
      return res.status(404).send(err.message);
    }
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export const leaveRoom = async (req, res) => {
  try {
    const room = await Room.leaveRoom(req.params.roomID, req.user.userID);
    res.status(200).json({
      data: room,
    });
  } catch (err) {
    if (err.message === "Room not found!") {
      return res.status(404).send(err.message);
    }
    if (err.message === "User not found!") {
      return res.status(404).send(err.message);
    }
    console.log(err);
    res.status(500).json({ error: err });
  }
};

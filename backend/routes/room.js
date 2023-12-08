import express from 'express';
import { authentication } from '../utils/auth.js';
import { createRoom, getRoom, getRooms, getRoomsByUser, joinRoom, leaveRoom } from '../controllers/room.js';

const room = express.Router();

// Rooms API
room.get('/all', getRooms);
room.use(express.json());
room.use(authentication);
room.post('/', createRoom);
room.get('/', getRoomsByUser);
room.post('/:roomID', joinRoom);
room.delete('/:roomID', leaveRoom);
room.get('/:roomID', getRoom);

export default room;

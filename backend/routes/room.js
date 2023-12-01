import express from 'express';
import { authentication } from '../utils/auth.js';
import { createRoom, getRoom, getRooms, getRoomsByUser, getPublicRooms, updateRoom, joinRoom, leaveRoom, deleteRoom } from '../controllers/room.js';

const room = express.Router();

// Rooms API
room.get('/all', getRooms);
room.use(express.json());
room.use(authentication);
room.post('/', createRoom);
room.get('/', getRoomsByUser);
room.post('/join/:roomID', joinRoom);
room.post('/leave/:roomID', leaveRoom);
room.get('/public', getPublicRooms);
room.get('/:roomID', getRoom);
room.put('/:roomID', updateRoom);
room.delete('/:roomID', deleteRoom);

export default room;

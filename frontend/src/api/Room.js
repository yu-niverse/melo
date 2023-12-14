import { API } from "./index";
import axios from "axios";

export const GetRoomInfo = async (roomID) => {
  const response = await axios({
    method: "GET",
    url: API.room + "/" + roomID,
    headers: { "Content-Type": "application/json" },
  });
  return response.data.data;
};

export const GetRooms = async () => {
  const response = await axios({
    method: "GET",
    url: API.room,
    headers: { "Content-Type": "application/json" },
  });
  return response.data.data;
}

export const JoinRoom = async (id) => {
  const response = await axios({
    method: "POST",
    url: API.room + "/" + id.id,
    headers: { "Content-Type": "application/json" },
  });
  return response.data.data;
}

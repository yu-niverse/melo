import { API } from "./index";
import axios from "axios";

export const GetRoomInfo = async (roomID) => {
  const response = await axios({
    method: "GET",
    url: API.room + "/" + roomID,
    headers: { "Content-Type": "application/json" },
  });
  if (response.status !== 200) {
    throw new Error(response.data);
  }
  console.log(response.data.data);
  return response.data.data;
};

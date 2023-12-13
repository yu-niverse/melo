import { API } from "./index";
import axios from "axios";

export const GetSongs = async () => {
  const response = await axios({
    method: "GET",
    url: API.song,
    headers: { "Content-Type": "application/json" },
  });
  return response.data.data;
};

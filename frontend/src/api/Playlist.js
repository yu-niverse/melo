import { API } from "./index";
import axios from "axios";

export const CreatePlaylist = async (id) => {
    console.log(id);
  const response = await axios({
    method: "POST",
    url: API.playlist + "/" + id.id,
    headers: { "Content-Type": "application/json" }
  });
  return response.data.data;
};

export const GetPlaylistSongs = async (roomID, playlistID) => {
  const response = await axios({
    method: "GET",
    url: API.playlist + "/" + roomID + "/" + playlistID,
    headers: { "Content-Type": "application/json" }
  });
  return response.data.data;
}

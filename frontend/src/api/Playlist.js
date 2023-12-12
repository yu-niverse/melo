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

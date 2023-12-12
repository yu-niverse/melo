import { CreatePlaylist } from "../api/Playlist";
import { useMutation } from "react-query";

export const useCreatePlaylist = () => {

  return useMutation(CreatePlaylist, {
    onSuccess: (data) => {
      console.log(data.data);
    },
    onError: (error) => {
      console.log(error);
      alert(error.response.data);
    },
  });
};

import { CreatePlaylist, GetPlaylistSongs } from "../api/Playlist";
import { useMutation, useQuery } from "react-query";

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

export const useGetPlaylistSongs = (roomID, playlistID) => {
  return useQuery(["GetPlaylistSongs", roomID, playlistID], () =>
    GetPlaylistSongs(roomID, playlistID)
  );
};

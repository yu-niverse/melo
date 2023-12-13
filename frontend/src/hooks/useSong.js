import { GetSongs } from "../api/Song";
import { useQuery } from "react-query";

export const useGetSongs = () => {
  return useQuery("GetSongs", GetSongs);
};

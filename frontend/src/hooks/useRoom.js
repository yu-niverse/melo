import { GetRoomInfo, GetRooms } from "../api/Room";
import { useQuery } from "react-query";

export const useGetRoomInfo = (roomID) => {
  return useQuery(["GetRoomInfo", roomID], () => GetRoomInfo(roomID));
};

export const useGetRooms = () => {
  return useQuery("GetRooms", () => GetRooms());
}

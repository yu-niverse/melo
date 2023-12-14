import { GetRoomInfo, GetRooms, JoinRoom } from "../api/Room";
import { useMutation, useQuery } from "react-query";

export const useGetRoomInfo = (roomID) => {
  return useQuery(["GetRoomInfo", roomID], () => GetRoomInfo(roomID));
};

export const useGetRooms = () => {
  return useQuery("GetRooms", () => GetRooms());
};

export const useJoinRoom = () => {
  return useMutation(JoinRoom, {
    onSuccess: (data) => {
      console.log(data.data);
    },
    onError: (error) => {
      console.log(error);
      alert(error.response.data);
    },
  });
}

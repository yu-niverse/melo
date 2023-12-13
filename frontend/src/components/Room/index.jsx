import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useUser";
import { useGetRoomInfo, useGetRooms } from "../../hooks/useRoom";
import { useCreatePlaylist } from "../../hooks/usePlaylist";
import { useMusic } from "../../provider/MusicProvider";
import AudioPanel from "../commonComponents/AudioPanel";
import AppBar from "../commonComponents/AppBar";
import RoomContent from "./RoomContent";
import SearchContent from "./SearchContent";
import socket from "../../socket";
import "./Room.css";

const Room = () => {
  const { id } = useParams();
  const { currentSong } = useMusic();
  const [page, setPage] = useState("room");
  console.log(currentSong);

  useEffect(() => {
    console.log("Effect triggered with id:", id);
    socket.emit("joinRoom", id);
    return () => {
      console.log("Effect cleanup with id:", id);
      socket.emit("leaveRoom", id);
    };
  }, [id]);

  const {
    data: roomInfo,
    isLoading: roomLoading,
    error: roomError,
    refetch: roomRefetch,
  } = useGetRoomInfo(id);
  const {
    data: userInfo,
    isLoading: userLoading,
    error: userError,
  } = useGetUserInfo();
  const {
    data: userRooms,
    isLoading: userRoomsLoading,
    error: userRoomsError,
  } = useGetRooms();
  const mutation = useCreatePlaylist(id);

  const handleAddPlaylist = () => {
    console.log("create playlist");
    mutation.mutate(
      { id },
      {
        onSuccess: () => {
          roomRefetch();
        },
      }
    );
  };

  if (roomLoading || userLoading || userRoomsLoading) {
    return <p>Loading...</p>;
  }

  if (roomError || userError || userRoomsError) {
    if (roomError) console.log(roomError);
    if (userError) console.log(userError);
    if (userRoomsError) console.log(userRoomsError);
    return <p>Error when fetching data</p>;
  }

  return (
    <div id="room-page" className="Page">
      <div className="room-page-container">
        {page === "room" ? (
          <RoomContent
            roomInfo={roomInfo}
            userRooms={userRooms}
            userInfo={userInfo}
            handleAddPlaylist={handleAddPlaylist}
          />
        ) : page === "playlist" ? (
          <div>Playlist</div>
        ) : page === "search" ? (
          <SearchContent userRooms={userRooms} />
        ) : page === "analysis" ? (
          <div>Analysis</div>
        ) : (
          <div>Invite</div>
        )}
      </div>
      {currentSong ? <AudioPanel /> : <div style={{ height: "3.5rem" }}></div>}
      <AppBar setPage={setPage} />
    </div>
  );
};

export default Room;

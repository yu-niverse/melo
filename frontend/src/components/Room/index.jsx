import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useUser";
import { useGetRoomInfo, useGetRooms } from "../../hooks/useRoom";
import { useCreatePlaylist } from "../../hooks/usePlaylist";
import { useMusic } from "../../provider/MusicProvider";
import AudioPanel from "../commonComponents/AudioPanel";
import AppBar from "../commonComponents/AppBar";
import RoomContent from "./RoomContent";
import PlaylistContent from "./PlaylistContent";
import SearchContent from "./SearchContent";
import Invite from "./Invite";
import socket from "../../socket";
import CircularProgress from "@mui/material/CircularProgress";
import "./Room.css";

const Room = () => {
  const { id } = useParams();
  const { currentSong, setCurrentSong } = useMusic();
  const [page, setPage] = useState("room");
  const [playlist, setPlaylist] = useState(null);
  const [openInvite, setOpenInvite] = useState(false);
  console.log(currentSong);

  const openInvitePanel = () => {
    console.log("open invite");
    setOpenInvite(true);
  };

  useEffect(() => {
    console.log("Effect triggered with id:", id);
    socket.emit("joinRoom", id);
    setPage("room");
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

  const handleClickPlaylist = (playlist) => {
    console.log("click playlist", playlist);
    setPlaylist(playlist);
    setPage("playlist");
  };

  const handleClickSong = (song) => {
    console.log("click song", song);
    setCurrentSong(song);
  };

  return (
    <div id="room-page" className="Page">
      <div className="room-page-container">
        {roomLoading || userLoading || userRoomsLoading ? (
          <div className="loading-container">
            <CircularProgress color="inherit" />
          </div>
        ) : roomError || userError || userRoomsError ? (
          <div className="loading-container">
            <span>Error when fetching data</span>
          </div>
        ) : page === "room" ? (
          <RoomContent
            roomInfo={roomInfo}
            userRooms={userRooms}
            userInfo={userInfo}
            handleAddPlaylist={handleAddPlaylist}
            handleClickPlaylist={handleClickPlaylist}
            setPage={setPage}
          />
        ) : page === "playlist" ? (
          <PlaylistContent
            roomInfo={roomInfo}
            userRooms={userRooms}
            playlist={playlist}
            handleClickSong={handleClickSong}
          />
        ) : page === "search" ? (
          <SearchContent userRooms={userRooms} playlists={roomInfo.playlists} />
        ) : page === "analysis" ? (
          <div>Analysis</div>
        ) : (
          <div>Invite</div>
        )}
      </div>
      {currentSong && <AudioPanel />}
      <AppBar setPage={setPage} openInvite={openInvitePanel} />
      <Invite openPanel={openInvite} setOpenPanel={setOpenInvite} />
    </div>
  );
};

export default Room;

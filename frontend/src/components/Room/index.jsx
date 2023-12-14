import { useState, useEffect, useRef } from "react";
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
import HLS from "hls.js";
import "./Room.css";

const Room = () => {
  const { id } = useParams();
  const { currentSong, setCurrentSong } = useMusic();
  const [page, setPage] = useState("room");
  const [playlist, setPlaylist] = useState(null);
  const [openInvite, setOpenInvite] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const audioRef = useRef();
  console.log("current song", currentSong);

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

  useEffect(() => {
    socket.on("play", (song, position) => {
      console.log("play", song);
      // load and play song
      if (HLS.isSupported()) {
        var hls = new HLS();
        hls.loadSource(song.url);
        hls.attachMedia(audioRef.current);
        hls.on(HLS.Events.MANIFEST_PARSED, function () {
          if (position !== undefined) {
            audioRef.current.currentTime = position;
          }
          audioRef.current.play();
          setCurrentSong({
            ...song,
            isPlaying: true,
          });
        });
      } else if (
        audioRef.current.canPlayType("application/vnd.apple.mpegurl")
      ) {
        audioRef.current.src = song.url;
        audioRef.current.play();
        setCurrentSong({
          ...song,
          isPlaying: true,
        });
      } else {
        console.log("Not supported");
      }
    });

    socket.on("pause", (song) => {
      console.log("pause", song);
      setPlaybackPosition(audioRef.current.currentTime);
      audioRef.current.pause();
      setCurrentSong({
        ...song,
        isPlaying: false,
      });
    });

    socket.on("seek", (position) => {
      console.log("seek", position);
      if (audioRef && audioRef.current) {
        audioRef.current.currentTime = position;
      }
    });

  }, [socket]);

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
    socket.emit("load", id, song);
    setCurrentSong({
      ...song,
      isPlaying: false,
    });
  };

  const handlePlay = (song) => {
    console.log("handle play", song.name);
    socket.emit("play", id, song, playbackPosition);
  };

  const handlePause = (song) => {
    console.log("handle pause", song.name);
    socket.emit("pause", id, song);
  };

  const handleSliderChange = (_, value) => {
    socket.emit("seek", id, value);
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
      {currentSong && (
        <AudioPanel
          roomID={id}
          audioRef={audioRef}
          handlePlay={handlePlay}
          handlePause={handlePause}
          handleSliderChange={handleSliderChange}
        />
      )}
      <audio id="audio-player" width="720" ref={audioRef}></audio>
      <AppBar setPage={setPage} openInvite={openInvitePanel} />
      <Invite openPanel={openInvite} setOpenPanel={setOpenInvite} />
    </div>
  );
};

export default Room;

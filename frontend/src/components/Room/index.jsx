import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetRoomInfo } from "../../hooks/useGetRoomInfo";
import TopBar from "./TopBar";
import Members from "./Members";
import Playlists from "./Playlists";
import AudioPanel from "../commonComponents/AudioPanel";
import AppBar from "../commonComponents/AppBar";
import "./Room.css";

const Room = () => {

  const { id } = useParams();

  const [isPlaying, setIsPlaying] = useState(false);
  const { data: roomInfo, isLoading, error } = useGetRoomInfo(id);
  const currentSong = {
    title: "Off the Record",
    artist: "IVE",
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(error);
    return <p>Error fetching room information</p>;
  }

  return (
    <div id="room-page" className="Page">
      <div className="room-page-container">
        <TopBar roomName={roomInfo.name} />
        <Members memberList={roomInfo.members} />
        <Playlists playlists={roomInfo.playlists} />
      </div>
      <AudioPanel
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <AppBar />
    </div>
  );
};

export default Room;

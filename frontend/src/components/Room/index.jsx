import { useState } from "react";
import { useParams } from "react-router-dom";
import TopBar from "./TopBar";
import Members from "./Members";
import Playlists from "./Playlists";
import AudioPanel from "../commonComponents/AudioPanel";
import AppBar from "../commonComponents/AppBar";
import "./Room.css";

const Room = () => {
  const { id } = useParams();

  const [isPlaying, setIsPlaying] = useState(false);

  const memberList = ["Angel", "Kelly", "Yun", "John", "Mars"];

  const playlists = [
    {
      title: "playlist 1",
      creator: "Angel",
    },
    {
      title: "playlist 2",
      creator: "John",
    },
    {
      title: "playlist 3",
      creator: "Kelly",
    },
    {
      title: "playlist 4",
      creator: "Yun",
    },
    {
      title: "playlist 5",
      creator: "Peggy",
    },
  ];

  const currentSong = {
    title: "Off the Record",
    artist: "IVE",
  };

  return (
    <div id="room-page" className="Page">
      <div className="room-page-container">
        <TopBar roomName={`Room ${id} Name`} />
        <Members memberList={memberList} />
        <Playlists playlists={playlists} />
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

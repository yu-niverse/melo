import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useUser";
import { useGetRoomInfo } from "../../hooks/useRoom";
import TopBar from "./TopBar";
import Members from "./Members";
import Playlists from "./Playlists";
import AudioPanel from "../commonComponents/AudioPanel";
import AppBar from "../commonComponents/AppBar";
import "./Room.css";

const Room = () => {

  const { id } = useParams();

  const [isPlaying, setIsPlaying] = useState(false);
  const { data: roomInfo, isLoading: roomLoading, error: roomError } = useGetRoomInfo(id);
  const { data: userInfo, isLoading: userLoading, error: userError } = useGetUserInfo(id);

  if (roomLoading || userLoading) {
    return <p>Loading...</p>;
  }

  if (roomError || userError) {
    if (roomError) console.log(roomError);
    if (userError) console.log(userError);
    return <p>Error when fetching data</p>;
  }

  return (
    <div id="room-page" className="Page">
      <div className="room-page-container">
        <TopBar roomName={roomInfo.name} />
        <Members memberList={roomInfo.othermembers} user={userInfo} />
        <Playlists playlists={roomInfo.playlists} />
      </div>
      {
        roomInfo.current_song ? (
          <AudioPanel
          currentSong={roomInfo.current_song}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
        ) : (
          <div style={{ height: '3.5rem' }}></div>
        )
      }
      <AppBar />
    </div>
  );
};

export default Room;

import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useUser";
import { useGetRoomInfo, useGetRooms } from "../../hooks/useRoom";
import { useCreatePlaylist } from "../../hooks/usePlaylist";
import TopBar from "./TopBar";
import Members from "./Members";
import Playlists from "./Playlists";
import AudioPanel from "../commonComponents/AudioPanel";
import AppBar from "../commonComponents/AppBar";
import "./Room.css";

const Room = () => {
  const { id } = useParams();

  const [isPlaying, setIsPlaying] = useState(false);
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
    mutation.mutate({ id }, {
      onSuccess: () => {
        roomRefetch();
      }
    });
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
        <TopBar roomName={roomInfo.name} roomList={userRooms} />
        <Members memberList={roomInfo.othermembers} user={userInfo} />
        <Playlists roomID={id} playlists={roomInfo.playlists} handleAddPlaylist={handleAddPlaylist}/>
      </div>
      {roomInfo.current_song ? (
        <AudioPanel
          currentSong={roomInfo.current_song}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
      ) : (
        <div style={{ height: "3.5rem" }}></div>
      )}
      <AppBar />
    </div>
  );
};

export default Room;

import TopBar from "./TopBar";
import Members from "./Members";
import Playlists from "./Playlists";

const RoomContent = (props) => {
  const { roomInfo, userRooms, userInfo, handleAddPlaylist } = props;

  return (
    <>
      <TopBar roomName={roomInfo.name} roomList={userRooms} />
      <Members memberList={roomInfo.othermembers} user={userInfo} />
      <Playlists
        playlists={roomInfo.playlists}
        handleAddPlaylist={handleAddPlaylist}
      />
    </>
  );
};

export default RoomContent;

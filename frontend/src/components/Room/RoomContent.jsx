import TopBar from "./TopBar";
import Members from "./Members";
import Playlists from "./Playlists";

const RoomContent = (props) => {
  const {
    roomInfo,
    userRooms,
    userInfo,
    handleAddPlaylist,
    handleClickPlaylist,
    setPage,
  } = props;

  return (
    <>
      <TopBar
        title={roomInfo.name}
        roomList={userRooms}
        canSearch={true}
        setPage={setPage}
      />
      <Members memberList={roomInfo.othermembers} user={userInfo} />
      <Playlists
        playlists={roomInfo.playlists}
        handleAddPlaylist={handleAddPlaylist}
        handleClickPlaylist={handleClickPlaylist}
      />
    </>
  );
};

export default RoomContent;

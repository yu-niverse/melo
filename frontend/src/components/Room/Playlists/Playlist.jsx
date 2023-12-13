import AvatarItem from "../../commonComponents/AvatarItem";

const Playlist = (props) => {
  const { playlist, handleClickPlaylist } = props;

  return (
    <div className="playlist" onClick={() => handleClickPlaylist(playlist)}>
      <AvatarItem
        title={<span className="item-name">{playlist.name}</span>}
        avatar={
          <div className="avatar-box playlist-avatar">
            <span>{playlist.name[0]}</span>
          </div>
        }
        subTitle={
          <div className="playlist-subtitle">{`playlist • ${playlist.added_by}`}</div>
        }
      />
    </div>
  );
};

export default Playlist;

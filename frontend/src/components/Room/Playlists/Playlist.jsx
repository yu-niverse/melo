import AvatarItem from "../../commonComponents/AvatarItem";

const Playlist = (props) => {
  const { title, creator } = props;

  return (
    <div className="playlist">
      <AvatarItem
        title={<span className="item-name">{title}</span>}
        avatar={
          <div className="avatar-box playlist-avatar">
            <span>{title[0]}</span>
          </div>
        }
        subTitle={
          <div className="playlist-subtitle">{`playlist • ${creator}`}</div>
        }
      />
    </div>
  );
};

export default Playlist;

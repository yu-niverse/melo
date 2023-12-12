import AvatarItem from "../../AvatarItem";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

const QueueHeader = (props) => {
    const { playingSong } = props;

  return (
    <div className="playing-container">
      <div className="avatar-container">
        <AvatarItem
          title={
            <span className="item-name playing-title-name">
              {playingSong.title}
            </span>
          }
          avatar={
            <div className="avatar-box playlist-avatar">
              <span>{playingSong.title[0]}</span>
            </div>
          }
          subTitle={
            <div className="artist-like">
              <span className="info-artist">{playingSong.artist}</span>
              <IconButton>
                <FavoriteBorderOutlinedIcon className="info-favorite-icon" />
              </IconButton>
              <span className="info-favorite-count">{playingSong.like}</span>
            </div>
          }
        />
      </div>
      <IconButton>
        <MoreHorizRoundedIcon className="more-icon" />
      </IconButton>
    </div>
  );
};

export default QueueHeader;

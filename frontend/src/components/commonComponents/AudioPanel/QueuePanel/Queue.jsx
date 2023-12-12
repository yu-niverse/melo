import AvatarItem from "../../AvatarItem";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const Queue = () => {
  const songList = [
    {
      title: "Off the Record",
      artist: "IVE",
      addUser: "Angel",
      like: 3,
    },
    {
      title: "Off the Record",
      artist: "IVE",
      addUser: "Mars",
      like: 3,
    },
    {
      title: "Off the Record",
      artist: "IVE",
      addUser: "Kelly",
      like: 3,
    },
    {
      title: "Off the Record",
      artist: "IVE",
      addUser: "Yun",
      like: 3,
    },
    {
      title: "Off the Record",
      artist: "IVE",
      addUser: "John",
      like: 3,
    },
    {
      title: "Off the Record",
      artist: "IVE",
      addUser: "Peggy",
      like: 3,
    },
    {
      title: "Off the Record",
      artist: "IVE",
      addUser: "Angel",
      like: 3,
    },
    {
      title: "Off the Record",
      artist: "IVE",
      addUser: "Mars",
      like: 3,
    },
  ];

  return (
    <div id="queue">
      <div className="queue-top">
        <span className="next-in-queue">Next in Queue</span>
        <button className="add-song">
          <AddRoundedIcon className="add-icon" />
          <span>Add Song</span>
        </button>
      </div>
      <div className="song-container">
        {songList.map((song, index) => (
          <div className="song-item" key={index}>
            <AvatarItem
              title={
                <span className="item-name menu-title-name">{song.title}</span>
              }
              subTitle={
                <div className="artist-like">
                  <span className="playlist-subtitle">{song.artist}</span>
                  <IconButton>
                    <FavoriteBorderOutlinedIcon className="queue-favorite-icon" />
                  </IconButton>
                  <span className="playlist-subtitle">{song.like}</span>
                </div>
              }
              endItem={
                <div className="end-item-container">
                  <Avatar className="end-avatar">
                    {song.addUser[0]}
                  </Avatar>
                  <IconButton>
                    <MenuRoundedIcon className="sort-icon" />
                  </IconButton>
                </div>
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Queue;

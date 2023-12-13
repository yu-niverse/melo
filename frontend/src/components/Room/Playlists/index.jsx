import Playlist from "./Playlist";
import "./Playlists.css";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const Playlists = (props) => {
  const { playlists, handleAddPlaylist, handleClickPlaylist } = props;

  return (
    <div id="playlists">
      <div className="playlists-top">
        <div className="playlists-title">Your Playlists</div>
        <button className="add-playlist" onClick={handleAddPlaylist}>
          <AddRoundedIcon className="add-icon" />
          <span className="button-text">New List</span>
        </button>
      </div>
      <div className="playlists-container">
        {playlists.map((playlist, index) => (
          <Playlist
            key={index}
            playlist={playlist}
            handleClickPlaylist={handleClickPlaylist}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlists;

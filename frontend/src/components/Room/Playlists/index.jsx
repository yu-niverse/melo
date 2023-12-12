import Playlist from "./Playlist";
import "./Playlists.css";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useCreatePlaylist } from "../../../hooks/usePlaylist";

const Playlists = (props) => {
  const { roomID, playlists, handleAddPlaylist } = props;
  // const mutation = useCreatePlaylist(roomID);

  // const handleAddPlaylist = () => {
  //   console.log("create playlist");
  //   mutation.mutate({ roomID });
  // };

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
            title={playlist.name}
            creator={playlist.added_by}
          />
        ))}
      </div>
    </div>
  );
};

export default Playlists;

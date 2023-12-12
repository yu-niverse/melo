import Playlist from "./Playlist";
import "./Playlists.css";

const Playlists = (props) => {
    const { playlists } = props;

  return (
    <div id="playlists">
        <div className="playlists-title">Your Playlists</div>
        <div className="playlists-container">
            {playlists.map((playlist, index) => (
                <Playlist key={index} title={playlist.title} creator={playlist.creator} />
            ))}
        </div>
    </div>
  );
};

export default Playlists;

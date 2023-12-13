import AvatarItem from "../AvatarItem";
import Stack from "@mui/material/Stack";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const AddSongPanel = (props) => {
  const { openPanel, setOpenPanel, playlists } = props;

  return (
    <Drawer
      anchor="bottom"
      open={openPanel}
      onClose={() => setOpenPanel(false)}
      sx={{
        "& .MuiBackdrop-root ": {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
      }}
    >
      <div id="add-song-panel">
        <IconButton className="close-btn" onClick={() => setOpenPanel(false)}>
          <CloseRoundedIcon />
        </IconButton>
        <AvatarItem
          title={<span className="item-name">Add to Queue</span>}
          avatar={
            <div className="avatar-box playlist-avatar">
              <AddRoundedIcon style={{ color: "#FDD18E" }} />
            </div>
          }
        />
        <div className="add-song-title">Add to Playlist</div>
        <Stack spacing={2} className="playlists-container-content">
          {playlists.map((playlist, index) => (
            <AvatarItem
              key={index}
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
          ))}
        </Stack>
        <button className="add-song-btn">Add</button>
      </div>
    </Drawer>
  );
};

export default AddSongPanel;

import ProgrssBar from "../ProgressBar";
import ControlBtns from "../ControlBtns";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import "./ControlPanel.css";

const ControlPanel = (props) => {
  const { openControlPanel, setOpenControlPanel, setOpenQueuePanel } = props;

  const playingSong = {
    title: "Off the Record",
    artist: "IVE",
    like: 3,
  };

  return (
    <Drawer
      anchor="bottom"
      open={openControlPanel}
      onClose={() => setOpenControlPanel(false)}
      sx={{
        "& .MuiBackdrop-root ": {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
      }}
    >
      <div id="control-panel">
        <div className="panel-title-container">
          <IconButton
            className="panel-title-icon"
            onClick={() => setOpenControlPanel(false)}
          >
            <KeyboardArrowDownRoundedIcon />
          </IconButton>
          <span className="panel-title">Now Playing</span>
        </div>

        <div className="image"></div>

        <div className="info-container">
          <span className="info-title">{playingSong.title}</span>
          <div className="artist-like">
            <span className="info-artist">{playingSong.artist}</span>
            <IconButton>
              <FavoriteBorderOutlinedIcon className="info-favorite-icon" />
            </IconButton>
            <span className="info-favorite-count">{playingSong.like}</span>
          </div>
          <ProgrssBar />
        </div>

        <ControlBtns
          queuePanel={false}
          setOpenControlPanel={setOpenControlPanel}
          setOpenQueuePanel={setOpenQueuePanel}
        />
      </div>
    </Drawer>
  );
};

export default ControlPanel;

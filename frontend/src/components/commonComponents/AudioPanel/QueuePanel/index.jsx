import ControlBtns from "../ControlBtns";
import QueueHeader from "./QueueHeader";
import Queue from "./Queue";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import "./QueuePanel.css";

const QueuePanel = (props) => {
  const { openPanel, setOpenPanel } = props;

  const playingSong = {
    title: "Off the Record",
    artist: "IVE",
    like: 3,
  };

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
      <div id="queue-panel">
        <IconButton className="close-icon" onClick={() => setOpenPanel(false)}>
          <CloseRoundedIcon />
        </IconButton>
        <div className="playing-title">Now Playing</div>
        <QueueHeader playingSong={playingSong} />
        <Queue />
        <ControlBtns queuePanel={true} />
      </div>
    </Drawer>
  );
};

export default QueuePanel;

import { useState } from "react";
import AvatarItem from "../AvatarItem";
import ControlPanel from "./ControlPanel";
import QueuePanel from "./QueuePanel";
import IconButton from "@mui/material/IconButton";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import "./AudioPanel.css";

const AudioPanel = (props) => {
  const { currentSong, isPlaying, setIsPlaying } = props;
  const { title, artist } = currentSong;

  const [openControlPanel, setOpenControlPanel] = useState(false);
  const [openQueuePanel, setOpenQueuePanel] = useState(false);

  return (
    <div id="audio-panel">
      <div
        className="avatar-container"
        onClick={() => setOpenControlPanel(true)}
      >
        <AvatarItem
          title={<span className="item-name panel-item-name">{title}</span>}
          avatar={
            <div className="avatar-box panel-avatar">
              <span>{title[0]}</span>
            </div>
          }
          subTitle={<div className="panel-subtitle">{artist}</div>}
        />
      </div>
      {isPlaying ? (
        <IconButton onClick={() => setIsPlaying(false)}>
          <PauseRoundedIcon className="panel-icon" />
        </IconButton>
      ) : (
        <IconButton onClick={() => setIsPlaying(true)}>
          <PlayArrowRoundedIcon className="panel-icon" />
        </IconButton>
      )}
      <ControlPanel
        openControlPanel={openControlPanel}
        setOpenControlPanel={setOpenControlPanel}
        setOpenQueuePanel={setOpenQueuePanel}
      />
      <QueuePanel openPanel={openQueuePanel} setOpenPanel={setOpenQueuePanel} />
    </div>
  );
};

export default AudioPanel;

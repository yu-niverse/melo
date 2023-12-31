import { useState } from "react";
import { useMusic } from "../../../provider/MusicProvider";
import AvatarItem from "../AvatarItem";
import ControlPanel from "./ControlPanel";
import QueuePanel from "./QueuePanel";
import IconButton from "@mui/material/IconButton";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import "./AudioPanel.css";

const AudioPanel = (props) => {
  const { roomID, handlePlay, handlePause, audioRef, handleSliderChange } = props;
  const [openControlPanel, setOpenControlPanel] = useState(false);
  const [openQueuePanel, setOpenQueuePanel] = useState(false);
  const { currentSong } = useMusic();

  return (
    <div id="audio-panel">
      <div
        className="avatar-container"
        onClick={() => setOpenControlPanel(true)}
      >
        <AvatarItem
          title={
            <span className="item-name panel-item-name">
              {currentSong.name}
            </span>
          }
          avatar={
            <div className="avatar-box panel-avatar">
              <span>{currentSong.name[0]}</span>
            </div>
          }
          subTitle={<div className="panel-subtitle">{currentSong.artist}</div>}
        />
      </div>
      {currentSong.isPlaying ? (
        <IconButton onClick={() => handlePause(currentSong)}>
          <PauseRoundedIcon className="panel-icon" />
        </IconButton>
      ) : (
        <IconButton onClick={() => handlePlay(currentSong)}>
          <PlayArrowRoundedIcon className="panel-icon" />
        </IconButton>
      )}
      <ControlPanel
        roomID={roomID}
        openControlPanel={openControlPanel}
        setOpenControlPanel={setOpenControlPanel}
        setOpenQueuePanel={setOpenQueuePanel}
        handlePlay={handlePlay}
        handlePause={handlePause}
        audioRef={audioRef}
        handleSliderChange={handleSliderChange}
      />
      <QueuePanel openPanel={openQueuePanel} setOpenPanel={setOpenQueuePanel} />
    </div>
  );
};

export default AudioPanel;

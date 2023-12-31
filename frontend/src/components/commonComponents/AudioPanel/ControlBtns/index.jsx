import IconButton from "@mui/material/IconButton";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import { ReactComponent as ShuffleBtn } from "../../../../assets/shuffle.svg";
import { ReactComponent as PlayBtn } from "../../../../assets/play.svg";
import { ReactComponent as PauseBtn } from "../../../../assets/pause.svg";
import { ReactComponent as QueueBtn } from "../../../../assets/queue.svg";
import { ReactComponent as RepeatBtn } from "../../../../assets/repeat.svg";
import { useMusic } from "../../../../provider/MusicProvider";
import socket from "../../../../socket";
import "./ControlBtns.css";

const ControlBtns = (props) => {
  const {
    roomID,
    queuePanel,
    setOpenControlPanel,
    setOpenQueuePanel,
    audioRef
  } = props;
  const { currentSong } = useMusic();

  const handlePlayClick = () => {
    if (audioRef && audioRef.current) {
      // console.log("haha", audioRef.current.currentTime);
      socket.emit("play", roomID, currentSong, audioRef.current.currentTime);
    }
  };

  const handlePauseClick = () => {
    socket.emit("pause", roomID, currentSong);
  };

  return (
    <div id="control-btns">
      <IconButton>
        <ShuffleBtn />
      </IconButton>
      <IconButton>
        <FastRewindRounded className="control-btn" />
      </IconButton>
      {currentSong.isPlaying ? (
        <IconButton onClick={handlePauseClick}>
          <PauseBtn />
        </IconButton>
      ) : (
        <IconButton onClick={handlePlayClick}>
          <PlayBtn />
        </IconButton>
      )}
      <IconButton>
        <FastForwardRounded className="control-btn" />
      </IconButton>
      {queuePanel ? (
        <IconButton>
          <RepeatBtn />
        </IconButton>
      ) : (
        <IconButton>
          <QueueBtn />
        </IconButton>
      )}
    </div>
  );
};

export default ControlBtns;

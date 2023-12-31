import { useState, useEffect } from "react";
import Slider from "@mui/material/Slider";
import Typography from '@mui/material/Typography';

const ProgressBar = (props) => {
  const { audioRef, handleSliderChange } = props;
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const handleTimeUpdate = () => {
      if (audioRef && audioRef.current) {
        setPosition(audioRef.current.currentTime);
        setDuration(audioRef.current.duration);
      }
    };

    if (audioRef && audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (audioRef && audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [audioRef]);

  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = Math.floor(value - minute * 60);
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  return (
    <>
      <Slider
        aria-label="time-indicator"
        size="small"
        value={position}
        min={0}
        step={1}
        max={duration}
        onChange={handleSliderChange}
        sx={{
          color: "#fff",
          height: 4,
          "& .MuiSlider-thumb": {
            width: 8,
            height: 8,
            transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
            "&:before": {
              boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
            },
            "&:hover, &.Mui-focusVisible": {
              boxShadow: `0px 0px 0px 8px ${"rgb(255 255 255 / 16%)"}`,
            },
            "&.Mui-active": {
              width: 20,
              height: 20,
            },
          },
          "& .MuiSlider-rail": {
            opacity: 0.28,
          },
        }}
      />
      <div className="time-container">
        <Typography className="time">{formatDuration(position)}</Typography>
        <Typography className="time">-{formatDuration(duration - position)}</Typography>
      </div>
    </>
  );
};

export default ProgressBar;

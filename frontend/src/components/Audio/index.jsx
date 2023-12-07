import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import HLS from "hls.js";
const URL = "http://192.168.0.101:4000";
export const socket = io(URL);

const Audio = () => {
  const [load, setLoad] = useState("");
  const [currentTime, setCurrentTime] = useState(0);

  const handleClick = () => {
    setLoad("Loading...");
    socket.emit("loadAudio");
  };

  const handleTimeUpdate = (event) => {
    setCurrentTime(event.target.currentTime);
  };

  const handleSeek = (event) => {
    const newPosition = event.target.value;
    socket.emit("seekAudio", newPosition);
  };

  const finishedLoading = () => {
    setLoad("Loaded");
  };

  const playAudio = () => {
    socket.emit("playAudio");
  };

  const pauseAudio = () => {
    socket.emit("pauseAudio");
  };

  useEffect(() => {
    const test = document.getElementById("audioPlayer");

    // Event listener for receiving the HLS stream URL from the server
    socket.on("loadAudio", (path) => {
      path = "http://192.168.0.101:4000" + path;
      console.log("load audio");
      console.log(path);
      if (HLS.isSupported()) {
        var hls = new HLS();
        hls.loadSource(path);
        hls.attachMedia(test);
        hls.on(HLS.Events.MANIFEST_PARSED, function () {
          setLoad("Loaded");
        });
      }
      // Native HLS support in browser (e.g., Safari)
      else if (test.canPlayType("application/vnd.apple.mpegurl")) {
        test.src = path;
      }
      else {
        setLoad("Not supported");
      }
    });

    socket.on("playAudio", () => {
      console.log("play audio");
      test.play();
    });

    socket.on("pauseAudio", () => {
      console.log("pause audio");
      test.pause();
    });

    socket.on("seekAudio", (newPosition) => {
      console.log("seek audio");
      test.currentTime = newPosition;
    });

    test.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      test.removeEventListener("timeupdate", handleTimeUpdate);
    }
  }, []);

  return (
    <div>
      <h1>Audio Player</h1>
      <button id="loader" onClick={handleClick}>
        Load
      </button>
      <span id="load">{load}</span>
      <audio
        autoPlay
        id="audioPlayer"
        width="720"
        onLoadedMetadata={finishedLoading}
        onPlay={playAudio}
        onPause={pauseAudio}
        currenttime={currentTime}
      ></audio>
      <div>
        <input
          type="range"
          min="0"
          value={currentTime}
          onChange={handleSeek}
        />
        <span>{currentTime.toFixed(2)} seconds</span>
      </div>
      <button id="playButton" onClick={playAudio}>
        Play
      </button>
      <button id="pauseButton" onClick={pauseAudio}>
        Pause
      </button>
    </div>
  );
};

export default Audio;

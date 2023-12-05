import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import HLS from 'hls.js';
const URL = 'http://localhost:4000';
export const socket = io(URL);

const Audio = () => {
  const [test, setTest] = useState(null);
  useEffect(() => {
    // Event listener for receiving the HLS stream URL from the server
    socket.on("playAudio", (path) => {
      path = "http://localhost:4000" + path;
      console.log("playAudio");
      console.log(path);
      const playButton = document.getElementById("playButton");
      const pauseButton = document.getElementById("pauseButton");
      const test = document.getElementById("audioPlayer");
      if (HLS.isSupported()) {
        var hls = new HLS();
        hls.loadSource(path);
        hls.attachMedia(test);
        // Play the video after the manifest is loaded
        hls.on(HLS.Events.MANIFEST_PARSED, function () {
          playButton.addEventListener("click", () => {
            test.play();
          });
          pauseButton.addEventListener("click", () => {
            test.pause();
          });
        });
      }
      // Native HLS support in browser (e.g., Safari)
      else if (test.canPlayType("application/vnd.apple.mpegurl")) {
        test.src = path;
        // Play the video after the metadata is loaded
        test.addEventListener("loadedmetadata", function () {
          playButton.addEventListener("click", () => {
            test.play();
          });
          pauseButton.addEventListener("click", () => {
            test.pause();
          });
        });
      }
    });

    // Cleanup the event listener when the component is unmounted
    return () => {
      socket.off("playAudio");
      if (test) {
        test.pause();
      }
    };
  }, [test]);

  return (
    <div>
      <h1>Audio Player</h1>
      <audio id="audioPlayer" controls width="720"></audio>
      <button id="playButton">Play</button>
      <button id="pauseButton">Pause</button>
    </div>
  );
};

export default Audio;

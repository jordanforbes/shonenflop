import React, { useState } from "react";

const AudioPlayer = ({ audioURL }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.createRef();

  const togglePlay = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <audio ref={audioRef} src={audioURL} />
      <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
};

export default AudioPlayer;

import React, { useEffect, useState } from "react";
import AudioPlayer from "./AudioPlayer";

const PodcastPlayer = ({ episode }) => {
  return (
    <div>
      <h3>{episode.title[0]}</h3>
      {episode.description[0]}
      <AudioPlayer audioURL={episode.audioURL[0]} />
    </div>
  );
};

export default PodcastPlayer;

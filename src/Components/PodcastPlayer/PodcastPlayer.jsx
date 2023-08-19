import React, { useEffect, useState } from "react";
import PodcastEpisode from "./PodcastEpisode";

const PodcastPlayer = (props) => {
  return (
    <div>
      podcastplayer.js
      {props.episodes.map((episode, index) => (
        <PodcastEpisode key={index} episode={episode} />
      ))}
    </div>
  );
};

export default PodcastPlayer;

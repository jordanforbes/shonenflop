import "./App.css";
// import PodcastPlayer from "./Components/PodcastPlayer/PodcastPlayer";
import React from "react";
import axios from "axios";
import xml2js from "xml2js";

import { useState, useEffect } from "react";

function App() {
  const [episodes, setEpisodes] = useState([]);

  const RSS_FEED = "https://feeds.libsyn.com/275975/rss";

  const fetchPodcastData = async () => {
    try {
      const response = await axios.get(RSS_FEED);
      const xml = response.data;

      const parser = new xml2js.Parser();
      parser.parseString(xml, (err, result) => {
        if (err) {
          console.error("Error parsing RSS feed", err);
          return;
        }

        const items = result.rss.channel[0].item;
        setEpisodes(items);
      });
    } catch (e) {
      console.error("Error fetching RSS feed", e);
    }
  };
  useEffect(() => {
    fetchPodcastData();
  }, []);

  const EpisodeCard = (props) => {
    const title = props.episode.title[0];
    const enclosure =
      props.episode.enclosure && props.episode.enclosure.length > 0
        ? props.episode.enclosure[0].$
        : null;

    return (
      <>
        <p>{title}</p>
        <div>
          <audio controls>
            <source src={enclosure ? enclosure.url : ""} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      </>
    );
  };

  return (
    <div className="App">
      app.js
      {episodes.map((ep) => (
        <EpisodeCard episode={ep} />
      ))}
    </div>
  );
}

export default App;

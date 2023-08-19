import "./App.css";
// import PodcastPlayer from "./Components/PodcastPlayer/PodcastPlayer";
import React from "react";
import axios from "axios";
import xml2js from "xml2js";

import { useState, useEffect } from "react";

function App() {
  const [episodes, setEpisodes] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.createRef();
  const [epURL, setEpURL] = useState("");
  let thisurl;

  const RSS_FEED = "https://feeds.libsyn.com/275975/rss";
  const CORS_ANYWHERE = "https://cors-anywhere.herokuapp.com/";

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

  useEffect(() => {
    // console.log(episodes);
    let firstep = episodes[0];
    console.log("single ep");
    console.log(firstep ? firstep : "noep");
    // console.log(firstep ? episodes[0].enclosure[0].$.url : "noep");

    setEpURL(firstep ? episodes[0].enclosure[0].$.url : "");
    console.log("enclosure");
    console.log(firstep);
  }, [episodes]);

  const EpisodeCard = (props) => {
    const title = props.episode.title[0];
    return (
      <>
        <p>{ep.title[0]}</p>
        <div>
          {(thisurl = ep.enclosure[0].$.url)}
          {console.log(thisurl)}
          {epURL !== "" ? (
            <audio controls>
              <source src={thisurl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          ) : (
            <p>notloaded</p>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="App">
      app.js
      {episodes.map((ep) => (
        <EpisodeCard />
      ))}
    </div>
  );
}

export default App;

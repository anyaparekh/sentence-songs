import { SpotifyApi, Scopes, SearchResults } from "@spotify/web-api-ts-sdk";
import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Back from "../components/Back";
import { useNavigate } from "react-router-dom";
import { queryOpenAI } from "../utils/openai";

import "../styles/Generate.css";

const sdk = SpotifyApi.withUserAuthorization(
  import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  import.meta.env.VITE_REDIRECT_TARGET,
  Scopes.all
);

async function CreatePlaylist(map: any, sentence: string) {
  let recs: string[] = [];
  console.log(map[0]);
  for (let song in map[0]) {
    const updatedSong = song.replaceAll(" ", "%20");
    const artist = map[0][song].replaceAll(" ", "%20");
    const res: SearchResults = await sdk.search(
      `track:${updatedSong}%20artist:${artist}`,
      ["track"],
      undefined,
      1
    );
    if (res.tracks.items.length > 0) {
      recs.push(res.tracks.items[0].uri);
    }
  }
  if (recs.length == 0) {
    return null;
  }

  const profile = await sdk.currentUser.profile();
  const id = profile.id;

  const playlist = await sdk.playlists.createPlaylist(id, {
    name: sentence,
    public: false,
  });

  await sdk.playlists.addItemsToPlaylist(playlist.id, recs);

  return playlist.external_urls.spotify;
}

function Generate() {
  const { state } = useLocation();
  const { sentence } = state;
  const [html, setHtml] = useState("");
  const [error, setError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  useEffect(() => {
    async function authenticate() {
      try {
        await sdk.authenticate();
        setIsAuthenticated(true);
        console.log("done");
      } catch (error) {
        console.error("Authentication failed:", error);
      }
    }
    authenticate();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    async function generateRes() {
      let response = (await queryOpenAI(sentence)) || "{}";
      console.log(response);
      console.log(JSON.parse(response));

      CreatePlaylist(JSON.parse(response), sentence).then((value) => {
        if (value == null) {
          setError(true);
        }
        const link: URL = new URL(
          `https://open.spotify.com/oembed?url=${value}&maxwidth=700&maxheight=700`
        );

        fetch(link, {
          method: "GET",
        }).then((htmlResponse) => {
          htmlResponse.json().then((body) => {
            setHtml(body.html);
          });
        });
      });
    }

    generateRes();
  }, []);

  useLayoutEffect(() => {
    if (document.getElementById("embedded")) {
      document
        .getElementById("embedded")
        ?.firstElementChild?.classList.add("embed");
    }
  });

  return html ? (
    <>
      <div className="back" onClick={handleClick}>
        <Back />
      </div>
      <div className="playlist-container">
        <p className="text">your custom playlist</p>
        <div className="embed-container">
          <div id="embedded" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </>
  ) : error ? (
    <>
      <div className="back" onClick={handleClick}>
        <Back />
      </div>
      <p className="loading">Error :(</p>
    </>
  ) : (
    <p className="loading">Loading...</p>
  );
}

export default Generate;

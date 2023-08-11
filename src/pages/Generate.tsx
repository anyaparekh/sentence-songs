import { SpotifyApi, Scopes } from '@spotify/web-api-ts-sdk';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Back from '../components/Back';
import { useNavigate } from 'react-router-dom';

import '../styles/Generate.css'

const sdk = SpotifyApi.withUserAuthorization(
    import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    import.meta.env.VITE_REDIRECT_TARGET,
    Scopes.all
);

await sdk.authenticate();

async function createPlaylist(sentence: string): Promise<string> {
    const top = await sdk.currentUser.topItems("tracks", undefined, 5, 0);
    const topfivetracks = top.items.map((obj) => obj.id);

    const recs = await sdk.recommendations.get({
        seed_artists: topfivetracks,
        target_acousticness: 0.5,
        target_danceability: 0.6,
        target_energy: 0.4,
        target_instrumentalness: 0.2,
        target_liveness: 0.3,
        target_loudness: 0.5
    });
    
    const profile = await sdk.currentUser.profile();
    const id = profile.id;

    const playlist = await sdk.playlists.createPlaylist(id, {
        "name": sentence,
        "public": false
    });

    await sdk.playlists.addItemsToPlaylist(playlist.id, recs.tracks.map((t) => t.uri));

    return playlist.external_urls.spotify;
}

function Generate() {
    const { state } = useLocation();
    const { sentence } = state;
    const [url, setUrl] = useState("");

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }

    useEffect(() => {
        createPlaylist(sentence).then((value) => {
            setUrl(value);
        })

    }, [sentence]);

    const link: URL = new URL(`https://open.spotify.com/oembed?url=${url}&maxwidth=700&maxheight=700`);

    const [response, setResponse] = useState(new Response);
    const [html, setHtml] = useState("");

    fetch(link, {
        method: 'GET',
    }).then((htmlResponse) => {
        setResponse(htmlResponse);
        response.json().then((body) => {
            setHtml(body.html);
        })
    })

    useLayoutEffect(() => {
    if (document.getElementById("embedded")){
        document.getElementById("embedded")?.firstElementChild?.classList.add('embed');
    }
    });


    return html ? (
        <>
            <div className='back' onClick={handleClick} >
                <Back />
            </div>
            <div className='playlist-container'>
                <p className='text'>your custom playlist</p>
                <div className="embed-container">
                    <div id="embedded" dangerouslySetInnerHTML={{__html: html}} />
                </div>
            </div>
        </>
    ) : (
        <p className="loading">Loading...</p>
    )
}

export default Generate;
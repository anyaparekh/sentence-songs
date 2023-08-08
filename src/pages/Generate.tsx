import { SpotifyApi, Scopes } from '@spotify/web-api-ts-sdk';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

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
        seed_tracks: topfivetracks,
        target_acousticness: Math.random(),
        target_danceability: Math.random(),
        target_energy: Math.random(),
        target_instrumentalness: Math.random(),
        target_liveness: Math.random(),
        target_loudness: Math.random()
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
    let count = 0;
    const { state } = useLocation();
    const { sentence } = state;
    let url = "";
    if (count == 0 && url == "") {
        count++;
        createPlaylist(sentence).then((value) => {
            url = value;
        });
    }
    return (
        <h1>{url}</h1>
    );
}

export default Generate;
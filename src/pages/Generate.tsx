import { SpotifyApi, Scopes } from '@spotify/web-api-ts-sdk';
import { useLocation } from 'react-router-dom';

const sdk = SpotifyApi.withUserAuthorization(
    import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    import.meta.env.VITE_REDIRECT_TARGET,
    Scopes.all
);

await sdk.authenticate();

function Generate() {
    const { state } = useLocation();
    const { sentence } = state;

    return (
        <h1>{sentence}</h1>
    );
}

export default Generate;
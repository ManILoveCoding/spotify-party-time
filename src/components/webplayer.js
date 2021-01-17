import SpotifyPlayer from 'react-spotify-web-playback';

const WebPlayer = ({ songId, access_token }) => {
  return <SpotifyPlayer token={access_token} uris={[`spotify:track:${songId}`]} />;
};

export default WebPlayer;

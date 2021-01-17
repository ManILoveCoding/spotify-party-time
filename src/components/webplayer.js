const WebPlayer = ({ songId }) => {
  return (
    <iframe
      src={`https://open.spotify.com/embed/track/${songId}`}
      title="current song playing"
      width="360"
      height="80"
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media"></iframe>
  );
};

export default WebPlayer;

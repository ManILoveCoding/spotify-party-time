const WebPlayer = ({ songUri }) => {
  return (
    <iframe
      src={`https://open.spotify.com/embed/track/${songUri}`}
      width="360"
      height="80"
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media"></iframe>
  );
};

export default WebPlayer;

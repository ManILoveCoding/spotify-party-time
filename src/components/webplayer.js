const WebPlayer = ({ songUri }) => {
  songUri = '2Lt2OCMsNF0DefG5H1NOqc';

  return (
    <iframe
      src={`https://open.spotify.com/embed/track/${songUri}`}
      width="300"
      height="80"
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media"></iframe>
  );
};

export default WebPlayer;

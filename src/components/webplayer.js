const WebPlayer = ({ songUri }) => {
  var type = songUri.split(':')[1];
  var id = songUri.split(':')[2];

  return (
    <iframe
      src={`https://open.spotify.com/embed/${type}/${id}`}
      title="current song playing"
      width="360"
      height="80"
      frameborder="0"
      allowtransparency="true"
      allow="encrypted-media"></iframe>
  );
};

export default WebPlayer;

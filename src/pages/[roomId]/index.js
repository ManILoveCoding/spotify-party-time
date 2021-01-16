import { Link, useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import WebPlayer from '../../components/webplayer';
import QueueList from '../../components/queue-list';

const Room = () => {
  let location = useLocation();
  var [roomId, setRoomId] = useState(null);
  var [currentSongUri, setCurrentSongUri] = useState('2Lt2OCMsNF0DefG5H1NOqc');

  // TODO: setCurrentSongUri from search bar

  // after "page" component loads, check location
  useEffect(() => {
    if (location) {
      setRoomId(location.pathname.split('/')[2]);
    }
  }, [location]);

  return (
    <>
      <Grid item>
        <h1> Currently in room: {roomId}</h1>
      </Grid>
      <Grid item>
        <WebPlayer songUri={currentSongUri} />
      </Grid>

      <QueueList roomId={roomId} />

      <Grid item>
        <Link to="/">
          <Button variant="contained" color="secondary" size="large">
            Home
          </Button>
        </Link>
      </Grid>
    </>
  );
};

export default Room;

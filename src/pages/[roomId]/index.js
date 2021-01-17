import { Link, useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useEffect, useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import WebPlayer from '../../components/webplayer';
import QueueList from '../../components/queue-list';
import SearchBar from '../../components/searchbar';
import getAccessCode from '../CreateRoom';

const Room = () => {
  const inputRef = useRef();
  let location = useLocation();
  var [roomId, setRoomId] = useState(null);
  var [access_code, setAccessCode] = useState('');
  var [currentSong, setCurrentSong] = useState('2Lt2OCMsNF0DefG5H1NOqc');

  // TODO: get access_token from robin stuff
  var access_token =
    'BQDuvYrH_s7VaTxroMaI7fXlXgwLet9DdJwdm2DohmFIB9Nzvoj8-jsCBKZ2-D6O4v4YD8Fsey0VQO9BVDiOUxj81lSw4TM8RlUqZy8chbHqK27HGQzMhMu5xfS-T4tciB3eW1ZAGw';

  // after "page" component loads, check location
  useEffect(() => {
    if (location) {
      setRoomId(location.pathname.split('/')[2].split('?')[0]);
      setAccessCode(location.pathname.split('/')[2].split('?')[1]);
    }
  }, [location]);

  return (
    <>
      <Grid item>
        <h1> Currently in room: {roomId}</h1>
      </Grid>
      <Grid item>
        <SearchBar
          access_token={access_token}
          style={{ height: '40px', width: '350px', fontSize: '15px' }}
          ref={inputRef}
          onSelect={(song) => {
            setCurrentSong(song);
          }}
          placeholder="Search for song..."
        />
      </Grid>
      <Grid item>
        <WebPlayer access_token={access_token} songId={currentSong.id} />
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

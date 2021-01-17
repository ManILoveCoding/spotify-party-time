import { Link, useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useEffect, useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import WebPlayer from '../../components/webplayer';
import QueueList from '../../components/queue-list';
import SearchBar from '../../components/searchbar';

const Room = () => {
  const inputRef = useRef();
  let location = useLocation();
  var [roomId, setRoomId] = useState(null);
  var [currentSongUri, setCurrentSongUri] = useState('2Lt2OCMsNF0DefG5H1NOqc');
  var [searchValue, setSearchValue] = useState('');

  // TODO: setCurrentSongUri from search bar

  // after "page" component loads, check location
  useEffect(() => {
    if (location) {
      setRoomId(location.pathname.split('/')[2]);
    }
  }, [location]);

  const handleSearch = (value) => {
    console.log(value);
  };

  const handleSongSelection = (song) => {
    console.log(song, ' selceted');
  };

  return (
    <>
      <Grid item>
        <h1> Currently in room: {roomId}</h1>
      </Grid>
      <Grid item>
        <SearchBar
          style={{ height: '40px', width: '350px', fontSize: '15px' }}
          ref={inputRef}
          onSelect={(song) => {
            handleSongSelection(song);
          }}
          placeholder="Search for song..."
        />
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

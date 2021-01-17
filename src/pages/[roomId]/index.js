import { Link, useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useEffect, useState, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import WebPlayer from '../../components/webplayer';
import QueueList from '../../components/queue-list';
import SearchBar from '../../components/searchbar';
import * as FirestoreService from '../../services/Firestore';
import useQueryString from '../../hooks/useQueryString';
import Typography from '@material-ui/core/Typography';

const Room = () => {
  const inputRef = useRef();


  let location = useLocation();
  var [roomId, setRoomId] = useState(null);
  var [currentSong, setCurrentSong] = useState('2Lt2OCMsNF0DefG5H1NOqc');

  // after "page" component loads, check location
  useEffect(() => {
    if (location) {
       setRoomId(location.pathname.split('/')[2]);
     }
   }, [location]);



  const handleSongSelection = (song) => {
    setCurrentSong(song.id);
    FirestoreService.addSongToRoom(song.id, roomId);
  };

  return (
    <>
      <Grid item>
        <h1> Currently in room: {roomId}</h1>
      </Grid>
      <Grid item>
        <Button
            size="large"
            color="primary"
            variant="outlined"
            className="button"
            onClick={() => {
              FirestoreService.getRoom(roomId);
              FirestoreService.addSongToRoom('test', roomId);
            }}>
            <Typography variant="body2" style={{ fontWeight: '900', fontSize: '20px' }}>
              Test Button
            </Typography>
        </Button>
      </Grid>
      <Grid item>
        <SearchBar
          style={{ height: '40px', width: '350px', fontSize: '15px' }}
          ref={inputRef}
          onSelect={(song) => {
            setCurrentSong(song);
          }}
          placeholder="Search for song..."
        />
      </Grid>
      <Grid item>
        <WebPlayer songId={currentSong.id} />
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

import React from 'react';

import './EditRoom.css';

import AddSong from './AddSong/AddSong';
import SongList from './SongList/SongList';
import { useEffect, useState, useRef } from 'react';

import { Button } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import WebPlayer from '../../components/webplayer';
import QueueList from '../../components/queue-list';
import SearchBar from '../../components/searchbar';
import ShuffleIcon from '@material-ui/icons/Shuffle';

function EditRoom(props) {

    const inputRef = useRef();
    var [currentSongUri, setCurrentSongUri] = useState('2Lt2OCMsNF0DefG5H1NOqc');
    var [searchValue, setSearchValue] = useState('');

    const { roomId, user, onCloseRoom, userId } = props;

    function onCreateRoomClick(e) {
        e.preventDefault();
        onCloseRoom();
    }
    
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
      <div className = 'rowC'>
        <SearchBar
          style={{ height: '40px', width: '350px', fontSize: '15px' }}
          ref={inputRef}
          onSelect={(song) => {
            handleSongSelection(song);
          }}
          placeholder="Search for song..."
        />
        <IconButton onClick={()=> console.log('shuffled')}>
          <ShuffleIcon style={{fill: "white"}}/>
        </IconButton>

      </div>
      </Grid>
      <Grid item>
        <WebPlayer songUri={currentSongUri} />
      </Grid>

      <QueueList roomId={roomId} />

      {/* <Grid item>
        <Link to="/">
          <Button variant="contained" color="secondary" size="large">
            Home
          </Button>
        </Link>
      </Grid> */}
    </>
        // <div>
        //     <header className="app-header">
        //         <h1>Live room</h1>
        //         <p><strong>Hi {user}!</strong></p>
        //         <p>Add songs to the room. When someone else adds a song it will instantly appear on the room.</p>
        //     </header>
        //     <div className="edit-container">
        //         <div className="add-item-column">
        //             <AddSong {...{roomId, userId}}></AddSong>
        //         </div>
        //         <div className="list-column">
        //             <SongList {...{roomId}}></SongList>
        //         </div>
        //     </div>
        //     <footer className="app-footer">
        //         <p>Share your list with others using <a href={`/?listId=${roomId}`} target="_blank" rel="noopener noreferrer">this link</a> or <a href="/" onClick={onCreateRoomClick}>create a new room</a>.</p>
        //     </footer>    
        // </div>
    );
}

export default EditRoom;
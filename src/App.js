import React, { useState, useEffect } from 'react';

import * as FirestoreService from './services/Firestore';

import CreateRoom from './pages/CreateRoom/CreateRoom';
//import Joinroom from './pages/JoinRoom/JoinRoom';
import EditRoom from './pages/EditRoom/EditRoom';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

import useQueryString from './hooks/useQueryString'

import Grid from '@material-ui/core/Grid';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

function App() {
  
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [room, setRoom] = useState();
  const [error, setError] = useState();

  const [roomId, setRoomId] = useQueryString('roomId');

  useEffect(() => {
    FirestoreService.authenticateAnonymously().then(userCredential => {
      setUserId(userCredential.user.uid);
      if(roomId) {
        FirestoreService.getRoom(roomId)
        .then(room => {
          if (room.exists) {
            setError(null);
            setRoom(room.data());
          } else {
            setError('room-not-found');
            setRoomId();
          }
        })
        .catch(() => setError('room-get-fail'));
      }
    })
    .catch(() => setError('anonymous-auth-failed'));
  }, [roomId, setRoomId]);

  function onroomCreate(roomId, userName) {
    setRoomId(roomId);
    setUser(userName);
  };

  function onCloseRoom() {
    setRoomId();
    setRoom();
    setUser();
  }

  /*
  function onSelectUser(userName) {
    setUser(userName);
    FirestoreService.getRoom(roomId)
    .then(updatedRoom => setroom(updatedRoom.data()))
    .catch(() => setError('room-get-fail'));
  }*/

  //if room and user are initiliazed, it renders the EditRoom.js page
  if(room) {
    return (
    <ThemeProvider theme={theme}>
    <Grid
      container
      spacing={4}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}>
    <div>
      <ErrorMessage errorCode={error}></ErrorMessage>
      <EditRoom {...{ roomId, user, onCloseRoom, userId}}></EditRoom>
    </div>
    </Grid>
  </ThemeProvider>
    )
  }

  /* else if(room) {
    return (
      <div>
        <ErrorMessage errorCode={error}></ErrorMessage>
        <Joinroom users={room.users} {...{roomId, onSelectUser, onCloseroom, userId}}></Joinroom>
      </div>
    );
  }*/

  //else it renders the CreateRoom.js page
  return (
    <ThemeProvider theme={theme}>
    <Grid
      container
      spacing={4}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}>
    <div>
      <ErrorMessage errorCode={error}></ErrorMessage>
      <CreateRoom onCreate={onroomCreate} userId={userId}></CreateRoom>
    </div>
    </Grid>
  </ThemeProvider>

  );
};

export default App;

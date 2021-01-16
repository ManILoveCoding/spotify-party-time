import Router from './routes';
import { BrowserRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

import React, { useState, useEffect } from 'react';
import * as FirestoreService from './services/Firestore';

import useQueryString from './hooks/useQueryString'

const App = () => {
  
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [queue, setQueue] = useState();
  const [error, setError] = useState();

  const [queueId, setQueueId] = useQueryString('queueId');

  useEffect(() => {
    FirestoreService.authenticateAnonymously().then(userCredential => {
      setUserId(userCredential.user.uid);
      if(queueId) {
        FirestoreService.getQueue(queueId)
        .then(queue => {
          if (queue.exists) {
            setError(null);
            setQueue(queue.data());
          } else {
            setError('queue-not-found');
            setQueueId();
          }
        })
        .catch(() => setError('queue-get-fail'));
      }
    })
    .catch(() => setError('anonymous-auth-failed'));
  }, [queueId, setQueueId]);

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        spacing={4}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Grid>
    </ThemeProvider>
  );
};

export default App;

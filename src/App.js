import React, { useState, useEffect } from 'react';

import * as FirestoreService from './services/Firestore';

import CreateQueue from './pages/CreateQueue/CreateQueue';
//import JoinQueue from './pages/JoinQueue/JoinQueue';
import EditQueue from './pages/EditQueue/EditQueue';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

import Router from './routes';
import { BrowserRouter } from 'react-router-dom';

import useQueryString from './hooks/useQueryString';

function App() {
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [queue, setQueue] = useState();
  const [error, setError] = useState();

  const [queueId, setQueueId] = useQueryString('queueId');

  useEffect(() => {
    FirestoreService.authenticateAnonymously()
      .then((userCredential) => {
        setUserId(userCredential.user.uid);
        if (queueId) {
          FirestoreService.getQueue(queueId)
            .then((queue) => {
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

  function onQueueCreate(queueId, userName) {
    setQueueId(queueId);
    setUser(userName);
  }

  function onCloseQueue() {
    setQueueId();
    setQueue();
    setUser();
  }

  /*
  function onSelectUser(userName) {
    setUser(userName);
    FirestoreService.getQueue(queueId)
    .then(updatedQueue => setQueue(updatedQueue.data()))
    .catch(() => setError('queue-get-fail'));
  }*/

  if (queue && user) {
    return <EditQueue {...{ queueId, user, onCloseQueue, userId }}></EditQueue>;
  } /* else if(queue) {
    return (
      <div>
        <ErrorMessage errorCode={error}></ErrorMessage>
        <JoinQueue users={queue.users} {...{queueId, onSelectUser, onCloseQueue, userId}}></JoinQueue>
      </div>
    );
  }*/
  return (
    <div>
      {/* <ErrorMessage errorCode={error}></ErrorMessage> */}
      {/* <CreateQueue onCreate={onQueueCreate} userId={userId}></CreateQueue> */}

      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;

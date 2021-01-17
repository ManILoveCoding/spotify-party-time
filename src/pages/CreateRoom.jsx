import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { Button, ThemeProvider } from '@material-ui/core';
import axios from 'axios';

const clientId = '88616603e64046f4a64cec1b94f02e1c';

const clientSecret = '291c5fef94874c789fd0927afc4a652e';

const AuthKey =
  'ODg2MTY2MDNlNjQwNDZmNGE2NGNlYzFiOTRmMDJlMWM6MjkxYzVmZWY5NDg3NGM3ODlmZDA5MjdhZmM0YTY1MmU=';

const redirectUrl = 'http://localhost:3000/create-room';

const CreateRoom = () => {
  const [code, setCode] = useState('');

  useEffect(() => {
    let url = window.location.href;
    let start = url.search('=');
    let end = url.search('&');
    console.log(window.location.href);
    setCode(url.substr(start + 1, end - start - 1));
    console.log(code);

    // get access code

    // get user info with access code

    // sign user in firestore

    // wait for user enter room id

    // load user to room.jsx
  });

  const getAccessCode = () => {
    if (code != '') {
      // THIS IS NOT WORKING
      axios('https://accounts.spotify.com/api/token', {
        method: 'post',
        params: {
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: redirectUrl,
          client_id: clientId,
          client_secret: clientSecret,
        },
      }).then((res) => {
        console.log('here');
      });
      // THIS IS NOT WORKING
    }
  };

  return (
    <div>
      <h1>Hello</h1>
      <input type="text" onChange={getAccessCode} />
    </div>
  );
};

export default CreateRoom;

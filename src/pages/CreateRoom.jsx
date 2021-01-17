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
  const [accessCode, setAccessCode] = useState('');

  useEffect(() => {
    let url = window.location.href;
    let start = url.search('=');
    let end = url.search('&');
    setCode(url.substr(start + 1, end - start - 1));

    // get access code
    getAccessCode();
    if (accessCode != undefined || accessCode != '') {
      console.log(accessCode);
      // get user info with access code
      // sign user in firestore
      // wait for user enter room id
      // load user to room.jsx
    }
  });

  const getAccessCode = () => {
    var url = 'https://accounts.spotify.com/api/token';

    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        console.log(xhr.status);
        let start = xhr.responseText.search(':');
        let end = xhr.responseText.search(',');
        let code = xhr.responseText.substr(start + 2, end - start - 3);
        if (code.length > 20) {
          setAccessCode(code);
        }
      }
    };

    var data =
      'grant_type=authorization_code&code=' +
      code +
      '&redirect_uri=http:%2F%2Flocalhost:3000%2Fcreate-room&client_id=88616603e64046f4a64cec1b94f02e1c&client_secret=291c5fef94874c789fd0927afc4a652e';

    xhr.send(data);
  };

  return (
    <div>
      <h1>Hello</h1>
      <input type="text" />
    </div>
  );
};

export default CreateRoom;

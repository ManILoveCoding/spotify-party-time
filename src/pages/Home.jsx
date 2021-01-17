import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { Button, ThemeProvider } from '@material-ui/core';

import OTPInput from '../components/otp-input';
import './Home.css';
import { createMuiTheme } from '@material-ui/core/styles';
import axios from 'axios';

const scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'app-remote-control',
  'user-read-email',
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
  'user-library-modify',
  'user-library-read',
  'user-top-read',
  'user-read-playback-position',
  'user-read-recently-played',
  'user-follow-read',
  'user-follow-modify',
];

const state = '34fFs29kd09';

const clientId = '88616603e64046f4a64cec1b94f02e1c';

const clientSecret = '291c5fef94874c789fd0927afc4a652e';

const redirectUrl = 'http://localhost:3000/create-room';

const Home = () => {
  const history = useHistory();

  const handlePinInputChange = (otp) => {
    if (otp.length === 6) {
      // TODO: if otp exists in database, then\
      history.push(`/room/${otp}`);
      // TODO: else, show alert "room doesn't exist"
    }
  };

  const handleCreateRoom = () => {
    // TODO: spotify login and database roomId registering
    axios('https://accounts.spotify.com/authorize', {
      headers: { 'Access-Control-Allow-Origin': '*' },
      method: 'GET',
      params: {
        client_id: clientId,
        response_type: 'code',
        redirect_uri: redirectUrl,
        state: '34fFs29kd09',
        scope: scopes,
      },
    });
  };

  const [joiningRoom, setJoiningRoom] = useState(false);

  const theme = createMuiTheme({
    darkMode: true,
    palette: {
      primary: {
        light: '#1ed760',
        main: '#1db954',
        dark: '#1db954',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ffffff',
        main: '#000000',
        dark: '#000000',
        contrastText: '#000',
      },
    },
    typography: {
      button: {
        textTransform: 'none',
        fontSize: '25px',
      },
    },
  });
  console.log('Room Created');

  return (
    <ThemeProvider theme={theme}>
      <div id="HomePage">
        {joiningRoom ? (
          <div id="PinBox">
            <h1>Enter pin to join a room</h1>
            <OTPInput
              autoFocus
              isNumberInput
              length={6}
              className="otpContainer"
              inputClassName="otpInput"
              onChangeOTP={(otp) => {
                handlePinInputChange(otp);
              }}></OTPInput>
          </div>
        ) : (
          <Button
            size="large"
            color="primary"
            variant="outlined"
            className="button"
            onClick={() => {
              setJoiningRoom(true);
            }}>
            <Typography variant="body2" style={{ fontWeight: '900', fontSize: '20px' }}>
              Join an existing room
            </Typography>
          </Button>
        )}
        <div>
          <Button
            style={{ marginTop: !joiningRoom ? '10px' : '150px' }}
            variant="contained"
            color="primary"
            className="button"
            onClick={() => {
              handleCreateRoom();
            }}>
            Start your own room
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Home;

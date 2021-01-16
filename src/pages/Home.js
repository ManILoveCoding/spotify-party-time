import { Button, ThemeProvider } from '@material-ui/core';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import OTPInput from '../components/otp-input';
import './Home.css';
import { createMuiTheme } from '@material-ui/core/styles';

const Home = () => {
  const [joiningRoom, setJoiningRoom] = useState(false);

  const history = useHistory();

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

  const handlePinInputChange = (otp) => {
    if (otp.length === 6) {
      // TODO: if otp exists in database, then
      history.push(`/room/${otp}`);
      // TODO: else, show alert "room doesn't exist"
    }
  };

  const handleCreateRoom = () => {
    // TODO: spotify login and database roomId registering
    console.log('Room Created');
  };

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
            onClick={() => {
              setJoiningRoom(true);
            }}>
            <Typography variant="body2" style={{ fontWeight: '900' }}>
              JOIN AN EXISTING ROOM
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

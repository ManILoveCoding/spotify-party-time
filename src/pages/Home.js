import { Link } from 'react-router-dom';
import { Button, ThemeProvider } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import OTPInput from '../custom-components/OTPInput';
import './Home.css';
import { createMuiTheme } from '@material-ui/core/styles';

const Home = () => {
  var roomId = Math.random().toString(36).substring(7);

  const [numOfPins, setNumOfPins] = useState(6);
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
      console.log('finished');
      history.push('/room');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div id="HomePage">
        <div id="PinBox">
          <h1>Enter pin to join a room</h1>
          <OTPInput
            autoFocus
            isNumberInput
            length={numOfPins}
            className="otpContainer"
            inputClassName="otpInput"
            onChangeOTP={(otp) => {
              handlePinInputChange(otp);
            }}></OTPInput>
        </div>
        <div className="ButtonContainer">
          <Link to="/room" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" className="button">
              Start a your own room
            </Button>
          </Link>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Home;


import { Link } from "react-router-dom";
import { Button, ThemeProvider } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import OTPInput from "../custom-components/OTPInput";
import "./Home.css";
import { createMuiTheme } from "@material-ui/core/styles";

import Typography from '@material-ui/core/Typography';

import OTPInput from '../components/otp-input';

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

  const [numOfPins, setNumOfPins] = useState(6);
  const history = useHistory();

  const theme = createMuiTheme({
    darkMode: true,
    palette: {
      primary: {
        light: "#1ed760",
        main: "#1db954",
        dark: "#1db954",
        contrastText: "#fff",
      },
      secondary: {
        light: "#ffffff",
        main: "#000000",
        dark: "#000000",
        contrastText: "#000",
      },
    },
    typography: {
      button: {
        textTransform: "none",
        fontSize: "25px",
      },
    },
  });

  const handlePinInputChange = (otp) => {
    if (otp.length === 6) {
      console.log("finished");
      history.push("/room");
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
            }}
          ></OTPInput>
        </div>
        <div className="ButtonContainer">
          <Link to="/room" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary" className="button">
              Start a your own room
            </Button>
          </Link>
        </div>
      </div>
    </ThemeProvider>

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

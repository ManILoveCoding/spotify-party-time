import React, { useState } from 'react';
import './CreateRoom.css';
import * as FirestoreService from '../../services/Firestore';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useHistory } from 'react-router-dom';

import { Button, ThemeProvider } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import OTPInput from '../../components/otp-input';

function  CreateRoom(props) {
    
    const { onCreate, userId } = props;

    const [ error, setError ] = useState();

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

    //creates a new room collection by calling the createRoom function from firestore.js, passing the text input of the user and generating a new id for them. (i think, im not really sure what step initializes the userId honestly)
    function createRoom() {
        //e.preventDefault();
        setError(null);

        const userName = 'Master';//document.createRoomForm.userName.value;
        if(!userName) {
            setError('user-name-required');
            return;
        }

        FirestoreService.createRoom(userName, userId)
        .then(docRef => {
            onCreate(docRef.id, userName);
        })
        .catch(reason => setError('create-list-error'));
    }

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
              {/* <form name ="createRoomForm">
                  <p><label><Typography variant="body2" style={{ fontWeight: '900', fontSize: '20px' }}>
                    Enter Display Name
                  </Typography></label></p>
                  <ErrorMessage errorCode={error}></ErrorMessage>
                  <p><input type="text" name="userName" /></p>
              </form> */}
                <Button
                    style={{ marginTop: !joiningRoom ? '10px' : '150px' }}
                    variant="contained"
                    color="primary"
                    className="button"
                    onClick={() => {
                        createRoom();
                    }}>
                    Start your own room
                </Button>
                
          </div>
        </div>
      </ThemeProvider>
    );
    /*
        <div>
            <header>
                <h1>Welcome to spotifypartytime we like to party!</h1>
            </header>
            <div className="create-container">
                <div>
                    <form name="createListForm">
                        <p><label>Whatcha Name?</label></p>
                        <p><input type="text" name="userName" /></p>
                        <ErrorMessage errorCode={error}></ErrorMessage>
                        <p><button onClick={createRoom}>Create a new Room</button></p>
                    </form>
                </div>
            </div>
        </div>
    );*/


}

export default CreateRoom;
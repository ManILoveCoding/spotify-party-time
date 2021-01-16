import { Link, useLocation } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react';

const Room = () => {
  let location = useLocation();
  var [roomId, setRoomId] = useState(null);

  useEffect(() => {
    if (location) {
      setRoomId(location.pathname.split('/')[2]);
    }
  }, [location]);

  return (
    <>
      <div>
        <h1> Currently in room: {roomId}</h1>
      </div>
      <Link to="/">
        <Button variant="outlined" color="secondary">
          Home
        </Button>
      </Link>
    </>
  );
};

export default Room;

import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

const Home = () => {
  var roomId = Math.random().toString(36).substring(7);

  return (
    <div className="flex items-center">
      <Link to={`/room/${roomId}`}>
        <Button variant="outlined" color="primary">
          Join room {roomId}
        </Button>
      </Link>
    </div>
  );
};

export default Home;

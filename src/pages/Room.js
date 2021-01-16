import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const Room = () => {
  return (
    <Link to="/">
      <Button variant="outlined">Home</Button>
    </Link>
  );
};

export default Room;

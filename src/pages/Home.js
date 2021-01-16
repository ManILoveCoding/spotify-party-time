import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    console.log("In home page");
  });

  return (
    <Link to="/room">
      <Button variant="outlined">Join room</Button>
    </Link>
  );
};

export default Home;

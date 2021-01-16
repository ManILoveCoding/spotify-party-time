import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Room from "./pages/Room";

const Routes = () => {
  return (
    <Switch>
      <Route path="/room">
        <Room />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default Routes;

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Room from './pages/[roomId]';
import CreateRoom from './pages/CreateRoom.jsx';

const Routes = () => {
  return (
    <Switch>
      <Route path="/create-room">
        <CreateRoom />
      </Route>
      <Route path="/room/*">
        <Room />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default Routes;

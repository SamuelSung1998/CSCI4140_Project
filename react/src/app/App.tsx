import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NavBar from '../features/navigationBar';
import Login from '../features/login';
import Logout from '../features/logout';
import Chat from '../features/chat';
import Settings from '../features/settings';

import './App.css';

const App: React.FC = () => (
  <div className="app container-fluid d-flex flex-column">
    <NavBar />
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/logout">
        <Logout />
      </Route>
      <Route path="/chat">
        <Chat />
      </Route>
      <Route path="/settings">
        <Settings />
      </Route>
    </Switch>
  </div>
);

export default App;

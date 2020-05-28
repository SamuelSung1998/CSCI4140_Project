import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import NavBar from '../features/navigationBar';
import Login from '../features/login';
import Logout from '../features/logout';
import Chat from '../features/chat';
import Settings from '../features/settings';
import Admin from '../features/admin';

import { recoverLoginReq } from '../features/login/redux/slice';

import './App.css';
import Protected from '../common/Protected';
import { ADMIN, USER } from '../features/login/types';

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(recoverLoginReq());
  }, [dispatch]);
  return (
    <div className="app container-fluid d-flex flex-column">
      <NavBar />
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/logout">
          <Protected groups={[ADMIN, USER]}>
            <Logout />
          </Protected>
        </Route>
        <Route path="/chat">
          <Protected groups={[ADMIN, USER]}>
            <Chat />
          </Protected>
        </Route>
        <Route path="/settings">
          <Protected groups={[ADMIN, USER]}>
            <Settings />
          </Protected>
        </Route>
        <Route path="/admin">
          <Protected groups={[ADMIN]}>
            <Admin />
          </Protected>
        </Route>
      </Switch>
    </div>
  );
};

export default App;

import React from 'react';
import { Route, Switch } from 'react-router';

import ChatroomPage from './ChatroomPage';

const Login: React.FC = () => (
  <Switch>
    <Route path="/chat">
      <ChatroomPage />
    </Route>
  </Switch>
);

export default Login;

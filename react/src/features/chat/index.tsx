import React from 'react';
import { Route, Switch } from 'react-router';

import ChatroomPage from './ChatroomPage';

const Login: React.FC = () => (
  <Switch>
    <Route path="/chat/chatroom">
      <ChatroomPage />
    </Route>
  </Switch>
);

export default Login;

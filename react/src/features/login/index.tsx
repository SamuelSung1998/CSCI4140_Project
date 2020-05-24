import React from 'react';
import { Route, Switch } from 'react-router';

import LoginForm from './FormPage';
import LoginPrompt from './PromptPage';


const Login: React.FC = () => (
  <Switch>
    <Route path="/login/user">
      <LoginForm group="user" key="userLogin" />
    </Route>
    <Route path="/login/admin">
      <LoginForm group="admin" key="adminLogin" />
    </Route>
    <Route path="/login">
      <LoginPrompt />
    </Route>
  </Switch>
);

export default Login;

import React from 'react';
import { Route, Switch } from 'react-router';

import LoginForm from './FormPage';
import LoginPrompt from './PromptPage';


const Login: React.FC = () => (
  <Switch>
    <Route path="/login">
      <LoginForm />
    </Route>
    <Route path="/login/prompt">
      <LoginPrompt />
    </Route>
  </Switch>
);

export default Login;

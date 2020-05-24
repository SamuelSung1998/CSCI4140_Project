import React from 'react';
import { Route, Switch } from 'react-router';

import LogoutForm from './FormPage';
import LogoutSuccess from './SuccessPage';


const Login = () => (
  <Switch>
    <Route path="/logout/success">
      <LogoutSuccess />
    </Route>
    <Route path="/logout">
      <LogoutForm />
    </Route>
  </Switch>
);

export default Login;

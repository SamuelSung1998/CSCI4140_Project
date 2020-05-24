import React from 'react';
import { Route, Switch } from 'react-router';

import FormPage from './FormPage';

const Settings: React.FC = () => (
  <Switch>
    <Route path="/settings">
      <FormPage />
    </Route>
  </Switch>
);

export default Settings;

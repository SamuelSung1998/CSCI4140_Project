import React from 'react';
import { Route, Switch } from 'react-router';

import TablePage from './TablePage';

const Settings: React.FC = () => (
  <Switch>
    <Route path="/admin">
      <TablePage />
    </Route>
  </Switch>
);

export default Settings;

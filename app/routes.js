/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import Home from './screens/common/Home';
import Scan from './screens/student/Scan';
import List from './screens/student/List';

export default () => (
  <div>
    <Switch>
      <Route path="/scan" component={Scan} /> 
      <Route path="/list" component={List} /> 
      <Route path="/" component={Home} />
    </Switch>
  </div>
);

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import App from './app';
import Login from './login';

ReactDOM.render(<Router>
  <Switch>
    <Redirect exact from='/' to='/app' />
    <Route path="/app" component={App} />
    <Route path="/login/" component={Login} />
    <Route component={() => <div>404</div>} />
  </Switch>
</Router>, document.getElementById('app'));
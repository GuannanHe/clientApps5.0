import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './app/reducers';
import App from './app';
import Login from './login';

const isProduction = process.env.NODE_ENV === 'production';
const composeEnhancers = isProduction ? compose : (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);
const middleware = applyMiddleware(thunk);
const store = createStore(reducer,composeEnhancers(middleware));

ReactDOM.render(<Provider store={store}>
    <Router>
    <Switch>
      <Redirect exact from='/' to='/app' />
      <Route path="/app" component={App} />
      <Route path="/login/" component={Login} />
      <Route component={() => <div>404</div>} />
    </Switch>
  </Router>
</Provider>, document.getElementById('app'));
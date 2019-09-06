import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import 'Styles/global.scss';

import { login, checkToken } from 'Data/auth';
import { isEmpty } from 'lodash';
import reducer from 'Data/reducers';
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
      <Route path="/app" render={ props => {
        if ( !isEmpty(checkToken()) ) {
          return <App { ...props } />;
        } else {
          return <Redirect to='/login' />;
        }
      }} />
      <Route path="/login/" component={Login} />
      <Route component={() => <div>404</div>} />
    </Switch>
  </Router>
</Provider>, document.getElementById('app'));
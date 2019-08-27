import React from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';

import Users from './users';

const Manage = ({ match }) => {
  return <Route path={`${match.path}/:type`} component={({ match }) => {
      if (match.params.type) {
        switch (match.params.type.toUpperCase()) {
          case 'USERS':
            return <Users />;
            break;
          default:
            return <Redirect to='/app/welcome_page' />;
        }
      } else {
        return <Redirect to='/app/welcome_page' />;
      }
    }} />
}

export default withRouter(props => <Manage {...props} />);

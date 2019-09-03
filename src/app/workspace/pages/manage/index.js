import React from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';

import Users from './users';

const Manage = ({ match, pageId }) => {
  return <Route path={`${match.path}/:type`} component={({ match }) => {
      if (match.params.type) {
        switch (match.params.type.toUpperCase()) {
          case 'USERS':
            return <Users pageId={pageId} />;
            break;
          default:
            return <Redirect to='/app/welcome_page' />;
            break;
        }
      } else {
        return <Redirect to='/app/welcome_page' />;
      }
    }} />
}

export default withRouter(props => <Manage {...props} />);

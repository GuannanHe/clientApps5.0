import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import Users from './users';

const Manage = ({ match }) => {
  return <Route path={`${match.path}/:type`} component={({ match }) => {
      if (match.params.type) {
        switch (match.params.type.toUpperCase()) {
          case 'USERS':
            return <Users />;
          default:
            return <div>manage</div>;
        }
      } else {
        return <div>manage</div>;
      }
    }} />
}

export default withRouter(props => <Manage {...props} />);

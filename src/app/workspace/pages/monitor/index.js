import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import Pipeline from './pipeline';

const Monitor = ({ match }) => {
  return <Route path={`${match.path}/:type`} component={({ match }) => {
      if (match.params.type) {
        switch (match.params.type.toUpperCase()) {
          case 'PIPELINE':
            return <Pipeline />;
          default:
            return <div>monitor</div>;
        }
      } else {
        return <div>monitor</div>;
      }
    }} />
}

export default withRouter(props => <Monitor {...props} />);

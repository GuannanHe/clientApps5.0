import React from 'react';
import { Route, withRouter } from 'react-router-dom';

import Pipeline from './pipeline';

const Asset = ({ match }) => {
  return <Route path={`${match.path}/:type`} component={({ match }) => {
      if (match.params.type) {
        switch (match.params.type.toUpperCase()) {
          case 'PIPELINE':
            return <Pipeline />;
          default:
            return <div>asset</div>;
        }
      } else {
        return <div>asset</div>;
      }
    }} />
}

export default withRouter(props => <Asset {...props} />);

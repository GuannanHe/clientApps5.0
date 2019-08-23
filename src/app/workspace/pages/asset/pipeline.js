import React from 'react';
import { Route, withRouter } from 'react-router-dom';

const Pipeline = ({ match }) => {
  return <Route path={`${match.path}/:id`} component={({ match }) => {
      return <div>{match.params.id}</div>
    }} />
}

export default withRouter(props => <Pipeline {...props} />);

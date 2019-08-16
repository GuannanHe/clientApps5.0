import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default ({match}) => {
  return <div>
    <ul>
      <li>
        <Link to={`${match.url}/components`}>Components</Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`${match.path}/:id`} component={() => <div>fdajfdkasl</div>} />
    <Route
      exact
      path={match.path}
      render={() => <h3>Please select a topic.</h3>}
    />

  </div>
}
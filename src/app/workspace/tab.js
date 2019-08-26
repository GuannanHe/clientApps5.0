import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './styles.scss';

const Tab = ({ page, match }) => {
  const dispatch = useDispatch();

  return <div key={page.id}>
    <span onClick={(event) => {
      event.stopPropagation();
      dispatch({
        type: 'REMOVE_PAGE',
        payload: { id: page.id },
      })
    }}>X</span>
    <Link to={`${match.url}/${page.path}`} >{page.title}</Link>
  </div>
}

export default withRouter(props => <Tab {...props} />);

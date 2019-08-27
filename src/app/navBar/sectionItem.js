import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import styles from './styles.scss';

const SectionItem = ({ title, to, icon, children, history, match }) => {
  const dispatch = useDispatch();
  
  const onClick = () => {
    dispatch({
      type: 'ADD_AND_SELECT_PAGE',
      payload: { title, path: to },
    });
  }

  return <div className={styles.item} onClick={onClick}>
    {title}
  </div>
}

export default withRouter(props => <SectionItem {...props} />);

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { find } from 'lodash';
import { TextField, Icon } from 'SL_UI';

import ToolBar from 'App/toolBar';
import { fetchUserList } from 'Data/users';
import withDetailPanel from 'App/workspace/withDetailPanel';
import UserDetail from './userDetail';

import styles from './styles.scss';

const User = ({ openDetail, pageId }) => {
  const states = useSelector(state => find(state.pagesReducer.pages, { id: pageId }).states);
  const users = useSelector(state => state.usersReducer.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserList());
  }, []);

  const buttons = [
    <Icon.Notification />,
    <Icon.Email />,
    <Icon.Help />,
    <Icon.Logout/>,
  ];

  return <div className={styles.container} >
    {/*<TextField
      onChange={event => dispatch({
        type: 'PUSH_STATE',
        payload: { id: pageId, states: states + event.target.value },
      })}
      qaId='state test'
    />
    {states} */}
    {
      users.map(user => <div key={user.username}>
        {`username: ${user.username}`}
        <button onClick={() => openDetail({component: <UserDetail name={user.username} />})}>open</button>
      </div>)
    }
    <ToolBar buttons={buttons} />
  </div>
}

export default props => withDetailPanel(<User { ...props } />);
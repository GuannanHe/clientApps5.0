import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { find } from 'lodash';
import { TextField } from 'SL_UI';

import withDetailPanel from 'App/workspace/withDetailPanel';
import UserDetail from './userDetail';

const USERS = [{name: 1}, {name: 2}, {name: 3}, {name: 4}, {name: 5}, {name: 6}]



const User = ({ openDetail, pageId }) => {
  const states = useSelector(state => find(state.pagesReducer.pages, { id: pageId }).states);
  const dispatch = useDispatch();
  return <div>
    <TextField
      onChange={event => dispatch({
        type: 'PUSH_STATE',
        payload: { id: pageId, states: states + event.target.value },
      })}
      qaId='state test'
    />
    {states}
    {
      USERS.map(user => <div key={user.name}>
        {`username: ${user.name}`}
        <button onClick={() => openDetail({component: <UserDetail name={user.name} />})}>o</button>
      </div>)
    }
  </div>
}

export default props => withDetailPanel(<User { ...props } />);
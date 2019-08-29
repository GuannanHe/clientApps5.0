import React from 'react';

import withDetailPanel from 'App/workspace/withDetailPanel';
import UserDetail from './userDetail';

const USERS = [{name: 1}, {name: 2}, {name: 3}, {name: 4}, {name: 5}, {name: 6}]



const User = ({ openDetail }) => {
  return <div>
    {
      USERS.map(user => <div key={user.name}>
        {`username: ${user.name}`}
        <button onClick={() => openDetail({component: <UserDetail name={user.name} />})}>o</button>
      </div>)
    }
  </div>
}

export default () => withDetailPanel(<User />);
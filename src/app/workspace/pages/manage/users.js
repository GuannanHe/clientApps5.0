import React from 'react';

import withDetailPanel from 'App/workspace/withDetailPanel';

const User = () => <div>users</div>;

const UserDetail = () => <div>userDetail</div>;

export default () => withDetailPanel({
  pageContent: <User />,
  detailPanel: <UserDetail />,
});

// export default () => <div>users</div>;
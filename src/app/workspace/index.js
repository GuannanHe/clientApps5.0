import React, { useState, useEffect } from 'react';
import { Route, Link, Switch } from "react-router-dom";
import { findIndex, find } from 'lodash';
import TabsBar from 'SL_UI/tabsBar';

import './styles.scss';

export default ({ location, match, tabs }) => {
  const [selectedIndex, setSelectIndex] = useState(0);
  const links = tabs.map(tab => <Link to={`${match.url}/${tab.id}`} key={tab.id}>{tab.title}</Link>);
console.log(location)
  const currentIndex = find(tabs, { id: match.params.id });

  useEffect(() => {
    if (currentIndex) {
      setSelectIndex(currentIndex);
    }
  }, [])

  return <div className='workspace'>
    <TabsBar
      selectedIndex={selectedIndex}
      onClick={(index) => setSelectIndex(index)}
      tabs={links}
    />
    <Route path={`${match.path}/:id`} component={({ match }) => {
      const tab = find(tabs, { id: match.params.id });
      return tab.component;
    }} />
    <Route exact path={`${match.path}`} component={({match}) => <h3>create a new page</h3>} />
  </div>
}
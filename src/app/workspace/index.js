import React, { useState, useEffect, useContext } from 'react';
import { Route, Link, Switch } from "react-router-dom";
import { findIndex, find } from 'lodash';
import TabsBar from 'SL_UI/tabsBar';

import PagesContext from '../contexts/pagesContext';
import './styles.scss';

export default ({ location, match }) => {
  const [selectedIndex, setSelectIndex] = useState(0);
  const pages  = useContext(PagesContext);
console.log(pages);
  const links = pages.map(tab => <Link to={`${match.url}/${tab.id}`} key={tab.id}>{tab.title}</Link>);
  
  const currentIndex = find(pages, { id: match.params.id });

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
      const page = find(pages, { id: match.params.id });
      if (page) {
        return page.component;
      } else {
        return <h3>404</h3>;
      }
    }} />
  </div>
}
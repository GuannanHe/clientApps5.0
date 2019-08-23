import React, { useState } from 'react';
import TabsBar from 'SL_UI/tabsBar';
import { v4 } from 'uuid';

import { PagesProvider, 
  getPages,
  addPage,
  removePage,
  getSelectedPage,
  setSelectedPage } from 'Context/pagesContext';
import Header from './header';
import Workspace from './workspace';
import NavBar from './navBar';
import { mainContainer } from './styles.scss';

export default ({ match, location, history }) => {
  const [pages, setPages] = useState(getPages());
  const [selected, setSelected] = useState(getSelectedPage());
  
  // const navBarConfig = [{
  //   title: 'Asset',
  //   items: [{
  //     title: 'Pipeline'
  //   }]
  // }, {
  //   title: 'Monitor'
  // }, {
  //   title: 'Manage',
  //   items: [{
  //     title: 'Users',
  //     icon: <img />,
  //     to: 'manage/users',
  //   }],
  // }];

  const contextValue = {
    pages,
    selected,
    addPage: page => {
      setPages(addPage(page));
      history.push(`${match.url}/${page.path}`);
    },
    removePage: id => {
      const result = removePage(id);
      setPages(result.pages);
      setSelected(result.selected);
      history.push(`${match.url}/${result.pages[result.selected].path}`);
    },
    setSelected: index => setSelected(setSelectedPage(index)),
  }

  return <PagesProvider value={ contextValue } >
    <div className={mainContainer}>
      <Header />
      <Workspace />
    </div>
  </PagesProvider>
}
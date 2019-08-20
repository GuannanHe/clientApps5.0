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
import './styles.scss';

export default ({ match, location }) => {
  const [pages, setPages] = useState(getPages());
  const [selected, setSelected] = useState(getSelectedPage());
  
  const navBarConfig = [{
    title: 'Asset'
  }, {
    title: 'Monitor'
  }, {
    title: 'Manage',
    items: [{
      title: 'Users',
      icon: <img />,
      to: 'manage/users',
    }],
  }];

  const contextValue = {
    pages,
    selected,
    addPage: page => setPages(addPage(page)),
    removePage: id => setPages(removePage(id)),
    setSelected: index => setSelected(setSelectedPage(index)),
  }

  return <PagesProvider value={ contextValue } >
    <div className='main-container'>
      <Header />
      <Workspace />
      <NavBar sections={navBarConfig} />
    </div>
  </PagesProvider>
}
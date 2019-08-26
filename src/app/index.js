import React, { useState, useEffect } from 'react';
import TabsBar from 'SL_UI/tabsBar';
import { v4 } from 'uuid';
import { useDispatch } from 'react-redux';

import Header from './header';
import Workspace from './workspace';
import NavBar from './navBar';
import { mainContainer } from './styles.scss';

export default ({ match, location, history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_PAGES' });
    dispatch({ type: 'FETCH_SELECTED_PAGES' });
  }, []);

  return <div className={mainContainer}>
    <Header />
    <Workspace />
  </div>;
}
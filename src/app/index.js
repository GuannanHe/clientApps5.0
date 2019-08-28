import React, { useState, useEffect } from 'react';
import TabsBar from 'SL_UI/tabsBar';
import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';

import Header from './header';
import Workspace from './workspace';
import NavBar from './navBar';
import { mainContainer } from './styles.scss';

export default ({ match, location, history }) => {
  const dispatch = useDispatch();
  const fetching = useSelector(state => state.pagesReducer.fetching);

  useEffect(() => {
    dispatch({ type: 'FETCH_PAGES' });
    dispatch({ type: 'FETCH_SELECTED_PAGES' });
  }, []);

  return <div className={mainContainer}>
    <Header />
    { !fetching && <Workspace /> }
  </div>;
}
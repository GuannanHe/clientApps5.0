import React, { useState, useEffect } from 'react';
import TabsBar from 'SL_UI/tabsBar';
import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';

import { restoreSession } from 'Data/session';

import Header from './header';
import Workspace from './workspace';
import NavBar from './navBar';
import { mainContainer } from './styles.scss';

export default ({ match, location, history }) => {
  const dispatch = useDispatch();
  const fetching = useSelector(state => state.pagesReducer.fetching);
  const sessionFetching = useSelector(state => state.sessionReducer.fetching);
  const sessionError = useSelector(state => state.sessionReducer.sessionError);

  useEffect(() => {
    dispatch(restoreSession());
    dispatch({ type: 'FETCH_PAGES' });
    dispatch({ type: 'FETCH_SELECTED_PAGES' });
  }, []);

  useEffect(() => {
    if (!sessionFetching && sessionError) {
      history.push('/login');
    }
  }, [sessionError, sessionFetching]);

  return <div className={mainContainer}>
    <Header history={history} />
    { !fetching && !sessionFetching && <Workspace /> }
  </div>;
}
import React, { useState, useEffect, useContext } from 'react';
import { Route, Link, withRouter, Redirect } from 'react-router-dom';
import { findIndex, find } from 'lodash';
import TabsBar from 'SL_UI/tabsBar';
import { useSelector, useDispatch } from 'react-redux';

import NavBar from 'App/navBar';
import ToolBar from 'App/toolBar';
import Tab from './tab';
import Manage from './pages/manage';
import Asset from './pages/asset';
import Monitor from './pages/monitor';
import WelcomePage from './pages/welcome';
import './styles.scss';
import styles from './styles.scss';

const WorkSpace = ({ location, match }) => {
  const dispatch = useDispatch();
  const pages = useSelector(state => state.pagesReducer.pages);
  const selected = useSelector(state => state.pagesReducer.selectedPage);
  
  const links = pages.map(page => <div key={page.id} className={styles.tab}>
    <Link to={`${match.url}/${page.path}`} className={styles.link} >{page.title}</Link>
    <span onClick={(event) => {
      event.stopPropagation();
      dispatch({
        type: 'REMOVE_PAGE',
        payload: { id: page.id },
      })
    }} className={styles.close}>X</span>
  </div>);
  console.log(pages, selected)

  return <div className={styles.workspace}>
    <TabsBar
      selectedIndex={selected}
      onClick={(index) => dispatch({ type: 'SELECT_PAGE', payload: { id: index } })}
      tabs={links}
    />
    <div className={styles.container}>
      <NavBar />
      <div className={styles.mainArea}>
        <Route path={`${match.path}/:type`} component={({ match }) => {
          // if (!find(pages, { path: location.pathname })) {
          //   return <Redirect to='welcome_page' />;
          // } else {
            if (match.params.type) {
              switch (match.params.type.toUpperCase()) {
                case 'MANAGE':
                  return <Manage />
                  break;
                case 'ASSET':
                  return <Asset />
                  break;
                case 'MONITOR':
                  return <Monitor />
                  break;
                case 'WELCOME_PAGE':
                  const welcomeIndex = findIndex(pages, { id: 'welcome_page_id' });
                  if (welcomeIndex > -1) {
                    dispatch({ type: 'SET_PAGE', payload: { id: welcomeIndex } });
                  } else {
                    dispatch({ type: 'ADD_AND_SELECT_PAGE', payload: {
                      id: 'welcome_page_id',
                      path: 'welcome_page',
                      title: 'Welcome to Snaplogic 5.0',
                    }});
                  }
                  return <WelcomePage />;
                  break;
                default:
                  return <Redirect to='welcome_page' />;
                  break;
              }
            } else {
              return <Redirect to='welcome_page' />;
            }
          // }
        }} />
      </div>
      <ToolBar />
    </div>
  </div>
}

export default withRouter(props => <WorkSpace {...props}/>);

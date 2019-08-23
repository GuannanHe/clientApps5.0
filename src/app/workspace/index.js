import React, { useState, useEffect, useContext } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { findIndex, find } from 'lodash';
import TabsBar from 'SL_UI/tabsBar';

import PagesContext from 'Context/pagesContext';
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
  const { pages, selected, setSelected, removePage }  = useContext(PagesContext);
  
  const links = pages.map(page => <div key={page.id} className={styles.tab}>
    <Link to={`${match.url}/${page.path}`} className={styles.link} >{page.title}</Link>
    <span onClick={(event) => {
      event.stopPropagation();
      removePage({id: page.id})
    }} className={styles.close}>X</span>
  </div>);
  console.log(pages, selected)

  return <div className={styles.workspace}>
    <TabsBar
      selectedIndex={selected}
      onClick={(index) => setSelected(index)}
      tabs={links}
    />
    <div className={styles.container}>
      <NavBar />
      <div className={styles.mainArea}>
        <Route path={`${match.path}/:type`} component={({ match }) => {
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
              default:
                return <WelcomePage />;
            }
          } else {
            return <WelcomePage />;
          }
        }} />
      </div>
      <ToolBar />
    </div>
  </div>
}

export default withRouter(props => <WorkSpace {...props}/>);

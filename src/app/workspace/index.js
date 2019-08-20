import React, { useState, useEffect, useContext } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { findIndex, find } from 'lodash';
import TabsBar from 'SL_UI/tabsBar';

import PagesContext from 'Context/pagesContext';
import Manage from './pages/manage';
import WelcomePage from './pages/welcome';
import './styles.scss';

const WorkSpace = ({ location, match }) => {
  const { pages, selected, setSelected }  = useContext(PagesContext);
  const links = pages.map(page => <Link to={`${match.url}/${page.path}`} key={page.id}>{page.title}</Link>);
  console.log(pages)

  return <div className='workspace'>
    <TabsBar
      selectedIndex={selected}
      onClick={(index) => setSelected(index)}
      tabs={links}
    />
    <Route path={`${match.path}/:type`} component={({ match }) => {
      if (match.params.type) {
        switch (match.params.type.toUpperCase()) {
          case 'MANAGE':
            return <Manage />
            break;
          case 'Asset':
            break;
          case 'MONITOR':
            break;
          default:
            return <WelcomePage />;
        }
      } else {
        return <WelcomePage />;
      }
    }} />
  </div>
}

export default withRouter(props => <WorkSpace {...props}/>);

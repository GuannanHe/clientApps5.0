import React, { useState, useEffect, useContext } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';
import { findIndex, find } from 'lodash';
import TabsBar from 'SL_UI/tabsBar';

import PagesContext from 'Context/pagesContext';
import Tab from './tab';
import Manage from './pages/manage';
import WelcomePage from './pages/welcome';
import './styles.scss';

const WorkSpace = ({ location, match }) => {
  const { pages, selected, setSelected, removePage }  = useContext(PagesContext);
  
  const links = pages.map(page => <div key={page.id} className='tab'>
    <Link to={`${match.url}/${page.path}`} className='link' >{page.title}</Link>
    <span onClick={(event) => {
      event.stopPropagation();
      removePage({id: page.id})
    }} className='close'>X</span>
  </div>);
  console.log(pages, selected)

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

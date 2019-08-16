import React from 'react';
import TabsBar from 'SL_UI/tabsBar';
import { v4 } from 'uuid';


import Header from './header';
import Workspace from './workspace';
import './styles.scss';

export default ({ match, location }) => {

  const tabs = [
    {
      id: '0f5e7b0e-a3f9-44d4-b4e0-f45db0920b63',
      title: 'Tab 1',
      component: <div>tab1</div>,
    },
    {
      id: '37aaaa45-9ba6-49b6-b850-53e9cf9ae089',
      title: 'Tab 2',
      component: <div>tab2</div>,
    },
    {
      id: '009604c1-1959-4f5e-8231-44627f8e312f',
      title: 'Tab 3',
      component: <div>tab3</div>,
    },
  ]

  return <div className='main-container'>
    <Header />
    <Workspace match={match} location={location} tabs={tabs} />
  </div>
}
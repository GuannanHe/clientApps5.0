import React from 'react';
import Logo from 'Assets/LogoN.png';
import { Icon, TextField } from 'SL_UI';

import './styles.scss';

export default () => {
  return <div className='header'>
    <img className='logo' src={Logo} />
    <TextField
      className='search'
      onChange={() => {}}
      qaId='global-search'
    />
    <div className='operations'>
      <Icon.Notification />
      <Icon.Email />
      <Icon.Help />
      <Icon.Logout />
    </div>
  </div>
}
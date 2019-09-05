import React from 'react';
import Logo from 'Assets/LogoN.png';
import { Icon, TextField } from 'SL_UI';

import { logout } from 'Data/auth';

import styles from './styles.scss';

export default ({ history }) => {
  const handleLogout = () => {
    logout();
    history.push('/login');
  }

  return <div className={styles.header}>
    <img className={styles.logo} src={Logo} />
    <TextField
      className={styles.search}
      onChange={() => {}}
      qaId='global-search'
    />
    <div className={styles.operations}>
      <Icon.Notification />
      <Icon.Email />
      <Icon.Help />
      <Icon.Logout onClick={handleLogout} />
    </div>
  </div>
}
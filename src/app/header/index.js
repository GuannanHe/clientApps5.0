import React from 'react';
import Logo from 'Assets/LogoN.png';
import { Icon, TextField } from 'SL_UI';

import styles from './styles.scss';

export default () => {
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
      <Icon.Logout />
    </div>
  </div>
}
import React from 'react';

import styles from  './styles.scss';

export default ({ buttons }) => {
  return <div className={styles.toolBar}>
    tools
    {buttons}
  </div>
}

import React, { useState } from 'react';

import styles from './styles.scss';

export default ({ closeDetail, name }) => {
  return <div className={styles.detailContainer} >
    user detail {name}
    <button onClick={() => closeDetail()}>x</button>
  </div>
}
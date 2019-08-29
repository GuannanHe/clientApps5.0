import React, { useState, useEffect, useRef } from 'react';

import styles from './styles.scss';

const Component = ({ pageContent }) => {
  const [detailComponent, setDetailComponent] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const closeDetail = () => {
    console.log('close detail')
    setDetailOpen(false);
  }

  const openDetail = ({ component }) => {
    console.log('open detail')
    setDetailComponent(component);
    setDetailOpen(true);
  }

  return <div className={styles.withDetailMain}>
    {React.cloneElement(pageContent, { openDetail })}

    <div className={`${styles.detail} ${detailOpen ? styles.open : ''}`}>
      { detailComponent !== null && React.cloneElement(detailComponent, { closeDetail })}
    </div>
  </div>
}

export default content => <Component pageContent={content} />;

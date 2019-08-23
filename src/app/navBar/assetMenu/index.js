import React, { useRef, useEffect } from 'react';

import styles from  './styles.scss';

export default ({ open, indicatorPosition, dataUrl }) => {
  const indicatorRef = useRef(null);
  const indicatorInnerRef = useRef(null);

  useEffect(() => {
    if (indicatorRef && indicatorInnerRef) {
      console.log(indicatorRef.current.style)
      const top = indicatorPosition - 40; // - menu height;
      indicatorRef.current.style.top = `${top}px`;
      indicatorInnerRef.current.style.top = `${top + 1}px`;
    }
  }, [indicatorPosition]);

  return <div className={`${styles.menuContainer} ${open ? styles.open : ''}`}>
    <div className={styles.indicator} ref={indicatorRef} />
    <div className={styles.indicatorInner} ref={indicatorInnerRef} />
  </div>
}
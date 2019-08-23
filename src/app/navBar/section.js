import React from 'react';

import SectionItem from './sectionItem';
import styles from  './styles.scss';

export default ({ title, items=[], opened, open, children}) => {
  return <div className={`${styles.section} ${opened ? styles.open : ''}`}>
    <div className={styles.title} onClick={open}>{title}</div>
    {
      items.map((item, index) => <SectionItem
        title={item.title}
        icon={item.icon}
        to={item.to}
        key={`${title}-${index}`}
      />)
    }
    { children }
  </div>
}
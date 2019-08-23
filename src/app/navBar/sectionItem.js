import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PagesContext from 'Context/pagesContext';

import styles from './styles.scss';

export default ({ title, to, icon, children }) => {
  const { pages, addPage, setSelected } = useContext(PagesContext);
  
  const onClick = () => {
    addPage({ title, path: to });
    setSelected(pages.length);
  }

  return <div className={styles.item} onClick={onClick}>
    {title}
  </div>
}

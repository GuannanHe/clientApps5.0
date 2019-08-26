import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Icon, TextField } from 'SL_UI';
import { filter } from 'lodash';

import SectionItem from './sectionItem';
import styles from './styles.scss';
console.log(styles)
const ITEMS = (() => {
  const ret = [];
  for(let i = 0; i < 30; i++) {
    ret.push({
      title: `item-${i}`
    })
  }
  return ret;
})();

export default ({ title, id, selected, openMenu, dataUrl }) => {
  const [ searchInput, setSearchInput] = useState('');
  const [ items, setItems ] = useState([]);
  const postionRef = useRef(null);

  // Load Items
  useEffect(() => {
    //load item from data url
    setItems(ITEMS);
  }, []);

  const onClick = () => {
    if (selected === id) {
      openMenu({ id: null });
    } else {
      openMenu({
        id,
        dataUrl,
        position: postionRef.current.getBoundingClientRect().top,
      });
    }
  }

  const search = (list, searchInput) => {

  }

  return <div className={styles.item} ref={postionRef}>
    <span className={`${styles.title} ${selected === id ? styles.open : ''}`} onClick={onClick}>{title}</span>
  </div>
}

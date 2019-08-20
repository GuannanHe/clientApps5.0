import React from 'react';

import SectionItem from './sectionItem';
import './styles.scss';

export default ({ title, items=[], opened, open}) => {
  return <div className={`section${opened ? ' open' : ''}`}>
    <div className='title' onClick={open}>{title}</div>
    {
      items.map((item, index) => <SectionItem
        title={item.title}
        icon={item.icon}
        to={item.to}
        key={`${title}-${index}`}
      />)
    }
  </div>
}
import React, { useContext, useState } from 'react';

import Section from './section';
import './styles.scss';

export default ({ sections = [] }) => {
  const [opened, setOpend] = useState(0);

  return <div className='nav-bar'>
    {sections.map((section, index) => (
      <Section
        title={section.title}
        items={section.items}
        opened={index === opened}
        open={() => setOpend(index)}
        key={`${section.title}-${index}`}
      />
    ))}
  </div>
}
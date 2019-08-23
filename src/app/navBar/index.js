import React, { useContext, useState, useEffect } from 'react';

import Section from './section';
import SectionItem from './sectionItem';
import ItemWithSubMenu from './itemWithSubMenu';
import AssetMenu from './assetMenu';
import styles from  './styles.scss';

const AssetTypes = ['All', 'Pipe', 'File', 'Task', 'Snap Pack', 'Snaplex', 'Table', 'Proxy']

export default ({ sections = [] }) => {
  const [opened, setOpend] = useState(0);
  const [selectedSubMenuId, setSelectedSubMenuId] = useState(null);
  const [indicatorPosition, setIndicatorPosition] = useState(null);
  const [menuDataUrl, setMenuDataUrl] = useState('');

  useEffect(() => {
    if (opened !== 0) {
      setSelectedSubMenuId(null);
    }
  }, [opened])

  return <div className={styles.navBar}>
    {/*sections.map((section, index) => (
      <Section
        title={section.title}
        items={section.items}
        opened={index === opened}
        open={() => setOpend(index)}
        key={`${section.title}-${index}`}
      />
    )) */}
    <Section
      title={'Asset'}
      opened={opened == 0}
      open={() => setOpend(0)}
      key='asset'
    >
      {
        AssetTypes.map((type, index) => <ItemWithSubMenu
          title={type}
          id={`${type}-${index}`}
          openMenu={({ id, position, dataUrl }) => {
            setSelectedSubMenuId(id);
            setIndicatorPosition(position);
          }}
          selected={selectedSubMenuId}
          dataUrl='/some/url/to/fetch/list'
          key={`${type}-${index}`}
        />)
      }
    </Section>

    <Section
      title={'Manage'}
      items={[{
        title: 'Users',
        icon: <img />,
        to: 'manage/users',
      }]}
      opened={1 === opened}
      open={() => setOpend(1)}
      key={`Manage-${1}`}
    />
    <Section
      title={'Moniter'}
      items={[{
        title: 'Pipe',
        icon: <img />,
        to: 'moiter/pipe',
      }]}
      opened={2 === opened}
      open={() => setOpend(2)}
      key={`Manage-${2}`}
    />
    <AssetMenu
      indicatorPosition={ indicatorPosition }
      open={ selectedSubMenuId !== null && opened === 0 }
    />
  </div>
}
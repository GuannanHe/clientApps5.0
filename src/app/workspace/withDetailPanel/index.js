import React, { useState, useEffect, useRef } from 'react';
import {
  ReflexContainer,
  ReflexSplitter,
  ReflexElement
} from 'react-reflex';

import './styles.scss';

const Component = ({ pageContent, detailPanel }) => {
  const [detailComponent, setDetailComponent] = useState(null);
  const [detailPanelHeight, setDetailPanelHeight] = useState(0);
  const [flex, setFlex] = useState(1);
  const containerRef = useRef(null);

  const closeDetail = () => {
    setFlex(1);
  }

  const openDetail = ({ component, panelHeight }) => {
    setDetailComponent(component);
    setDetailPanelHeight(panelHeight);
  }

  useEffect(() => {
    const containerHeight = containerRef.current.getBoundingClientRect().height;
    setFlex(1 - detailPanelHeight/containerHeight);
  }, [detailPanelHeight]);

  return <div className='with-detail-main' ref={containerRef}>
    <ReflexContainer orientation='horizontal'>
 
      <ReflexElement flex={flex}>
        { React.createComponent(pageContent, { openDetail }) }
      </ReflexElement>

      <ReflexSplitter class='panel-splitter'/>

      <ReflexElement>
        { React.createComponent(detailComponent, { closeDetail }) }
      </ReflexElement>

    </ReflexContainer>
  </div>
}

export default props => <Component { ...props } />

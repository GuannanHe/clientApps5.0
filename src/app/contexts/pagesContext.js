import React from 'react';

const PagesContext = React.createContext([]);

export const getPages = () => {
  const storage = window.localStorage;
  const pages = localStorage.getItem('SnaplogicWorkspacePages') || [];

  if (pages.length === 0) {
    pages.push({
      id: 'newPageId',
      title: 'Welcome to Snaplogic 5.0',
      component: <div>Welcome to Snaplogic 5.0</div>,
    })
  }

  return pages;
}

export const PagesProvider = PagesContext.Provider;
export const PagesConsumer = PagesContext.Consumer;

export default PagesContext;

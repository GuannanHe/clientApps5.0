import React from 'react';
import { v4 } from 'uuid';
import { findIndex } from 'lodash';

const PagesContext = React.createContext([]);
const storage = window.localStorage;

export const getPages = () => {
  const pagesFromStorage = storage.getItem('SnaplogicWorkspacePages');
  const pages = pagesFromStorage ?
    JSON.parse(storage.getItem('SnaplogicWorkspacePages')) || [] : [];

  if (pages.length === 0) {
    pages.push({
      id: 'newPageid',
      path: 'newPage',
      title: 'Welcome to Snaplogic 5.0',
    })
  }

  return pages;
}

export const getSelectedPage = () => {
  return parseInt(localStorage.getItem('SnaplogicWorkspacePageSeleted')) || 0;
}

export const setSelectedPage = (index) => {
  localStorage.setItem('SnaplogicWorkspacePageSeleted', index);
  return index;
}

export const addPage = ({ title, path }) => {
  const pages = getPages();

  pages.push({
    title,
    path,
    id: v4(),
  });

  storage.setItem('SnaplogicWorkspacePages', JSON.stringify(pages));

  return pages;
}

export const removePage = ({ id }) => {
  const pages = getPages();
  const indexToRemove = findIndex(pages, { id });
  pages.splice(indexToRemove, 1);

  storage.setItem('SnaplogicWorkspacePages', pages);

  return pages;
}

export const PagesProvider = PagesContext.Provider;
export const PagesConsumer = PagesContext.Consumer;

export default PagesContext;

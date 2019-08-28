import { v4 } from 'uuid';
import { findIndex } from 'lodash';

const storage = window.localStorage;

const initState = {
  pages: [{
    id: 'welcome_page_id',
    path: 'welcome_page',
    title: 'Welcome to Snaplogic 5.0',
  }],
  selectedPage: 0,
  fetching: true,
}

export const getPages = () => {
  const pagesFromStorage = storage.getItem('SnaplogicWorkspacePages');
  const pages = pagesFromStorage ?
    JSON.parse(storage.getItem('SnaplogicWorkspacePages')) || [] : [];

  if (pages.length === 0) {
    pages.push({
      id: 'welcome_page_id',
      path: 'welcome_page',
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

export default function pages(state = initState, action = {}) {
  switch (action.type) {
    case 'ADD_PAGE':
      const toAdd = getPages();
      toAdd.push({ ...action.payload, id: v4() });
      storage.setItem('SnaplogicWorkspacePages', JSON.stringify(toAdd));
      return { ...state, pages: toAdd };
    case 'ADD_AND_SELECT_PAGE':
      const toSelectPage = getPages();
      toSelectPage.push({ ...action.payload, id: v4() });
      storage.setItem('SnaplogicWorkspacePages', JSON.stringify(toSelectPage));
      const toSelectIndex = setSelectedPage(toSelectPage.length - 1);
      return { ...state, pages: toSelectPage, selectedPage: toSelectIndex };
    case 'REMOVE_PAGE':
      const toRemove = getPages();
      const indexToRemove = findIndex(toRemove, { id: action.payload.id });
      toRemove.splice(indexToRemove, 1);
      const selectedPage = Math.max(indexToRemove - 1, 0);

      if (toRemove.length === 0) {
        toRemove.push({
          id: 'welcome_page_id',
          path: 'welcome_page',
          title: 'Welcome to Snaplogic 5.0',
        });
      }

      storage.setItem('SnaplogicWorkspacePages', JSON.stringify(toRemove));
      localStorage.setItem('SnaplogicWorkspacePageSeleted', selectedPage);

      return { ...state, pages: toRemove, selectedPage };
    case 'FETCH_PAGES':
      return { ...state, pages: getPages(), fetching: false };
    case 'FETCH_SELECTED_PAGES':
      return { ...state, selectedPage: getSelectedPage() };
    case 'SELECT_PAGE': 
      return { ...state, selectedPage: setSelectedPage(action.payload.id) };
    default:
      return state;
  }
}

import { combineReducers } from 'redux';

import pagesReducer from './pages/reducer';
import sessionReducer from './session/reducer';
import usersReducer from './users/reducer';

export default combineReducers({
  pagesReducer,
  sessionReducer,
  usersReducer,
});
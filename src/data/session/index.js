import axios from 'axios';
import { getSessionUsername, checkToken } from '../auth';

const _setAxios = token => {
  // axios.interceptors.request.use(config => {
  //   const configWithHeader = config;
  //   // UI-2171 move it from outside since the token will refreshed and need to reset the Authorization header
  //   configWithHeader.headers.common.Authorization = `SLToken ${token}`;
  //   return configWithHeader;
  // });
  axios.defaults.headers.common['Authorization'] = `SLToken ${token}`;
}

export const restoreSession = () => {
  _setAxios(checkToken());
  return dispatch => {
    dispatch({ type: 'RESTORE_SESSION_PENDING' });
    const username = getSessionUsername();
    return dispatch(fetchSessionUser({ username }));
  }
}

export function fetchSessionUser({ username }) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_SESSION_USER_PENDING' });
    return axios.get(`/api/1/rest/asset/user/${encodeURIComponent(username)}`)
      .then((res) => {
        dispatch({
          type: 'FETCH_SESSION_USER_FULFILLED',
          payload: res.data.response_map,
        });
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_SESSION_USER_REJECTED',
          payload: error,
        });
        console.error('Invalid user response, logging out');
      });
  };
}
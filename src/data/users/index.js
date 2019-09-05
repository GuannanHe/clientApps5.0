import axios from 'axios';
import { each } from 'lodash';

export function _errorCodeToMsgMapping(response) {
  // if (!response) {
  //   // axios sends an empty response in case of network error
  //   return message.errors[404];
  // }

  // return response.data && response.data.response_map && response.data.response_map.error_id ?
  //   message.errors[response.data.response_map.error_id] : message.errors[response.status];
  return 'error';
}

function _getPath(getState) {
  const snodeID = getState().sessionReducer.activeOrgId;
  return getState().sessionReducer.user.org_snodes[snodeID].path;
}

function _parseResponse(response, getState) {
  // add path to all of the entries
  each(response.response_map.entries, entry => ({
    ...entry,
    parent: _getPath(getState),
  }));
  return response.response_map;
}

export function fetchUserList() {
  return (dispatch, getState) => {
    dispatch({ type: 'FETCH_USER_LIST_PENDING' });
    return axios.get(`/api/1/rest/asset/user?path=${_getPath(getState)}`)
      .then((res) => {
        dispatch({
          type: 'FETCH_USER_LIST_FULFILLED',
          payload: _parseResponse(res.data, getState),
        });
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_USER_LIST_REJECTED',
          payload: { error: _errorCodeToMsgMapping(error.response) },
        });
      });
  };
}

export function fetchUser({ username }) {
  return (dispatch) => {
    dispatch({ type: 'FETCH_USER_PENDING' });
    return axios.get(`/api/1/rest/asset/user/${encodeURIComponent(username)}`)
      .then((res) => {
        dispatch({
          type: 'FETCH_USER_FULFILLED',
          payload: res.data.response_map,
        });
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_USER_REJECTED',
          payload: { error: _errorCodeToMsgMapping(error.response) },
        });
      });
  };
}

export function updateUser({ username, payload }) {
  return (dispatch) => {
    dispatch({ type: 'UPDATE_USER_PENDING' });
    return axios.post(`/api/1/rest/asset/user/${encodeURIComponent(username)}`, payload)
      .then(() => {
        dispatch({ type: 'UPDATE_USER_FULFILLED' });
        fetchUser(username);
      })
      .catch((error) => {
        dispatch({
          type: 'UPDATE_USER_REJECTED',
          payload: { error: _errorCodeToMsgMapping(error.response) },
        });
      });
  };
}

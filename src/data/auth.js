import axios from 'axios';
import Cookies from 'js-cookie';

const
  SL_TOKEN = 'SLToken',
  SLDBHOST = 'SLDBServerHostname',
  SLDBSERVERPORT = 'SLDBServerPort',
  SLDBSERVERPROTO = 'SLDBServerProtocol',
  API = '/api/1/rest/asset/session',
  API_DELETE_CACHE = '/api/2/{0}/rest/pm/runtime/cache/{1}',
  SLCREDENTIAL = 'SLCredential',
  SLDBUSERNAME = 'SLDBUsername',
  LOGINPAGE = 'login.html',
  CLIENT_VERSION = typeof BUILD_TAG === 'undefined' ? new Date().getTime() : BUILD_TAG,
  MAINTENANCEPAGE = 'maintenance.html',
  KEY_LAST_ACTIVITY_MILI = 'lastActivityMilliseconds',

  KEY_SESSION_TIMEOUT_SECS = 'session_timeout_seconds',
  KEY_IDLE_TIME_SECONDS = 'idle_timeout_seconds',
  KEY_LOGIN_TIME_MILI = 'login_time_miliseconds',

  REFRESH_SECONDS_BEFORE_EXPIRATION = 120, /* give enough time to react to server token expiration */
  WARNING_WHEN_IDLE_IS_NEAR = 120;

function _readCookie(name) {
  const
    fromCookie = Cookies.get(name),
    fromLocalStorage = localStorage.getItem(name)
  ;
  return fromCookie || fromLocalStorage;
}

export const checkToken = () => _readCookie(SL_TOKEN);

export const getSessionUsername = () => _readCookie(SLDBUSERNAME);

export const login = ({username, password}) => {
  return dispatch => {
    dispatch({ type: 'LOGIN_PENDING' });
    return axios.get(`/api/1/rest/asset/session?caller=${encodeURIComponent(username)}`,
      { headers: { Authorization: `Basic  ${btoa(`${username}:${password}`)}` } },
    )
      .then(res => {
        const { response_map } = res.data;
        const login_time = new Date().getTime();

        // These localStorage items are used after designer/dashboard/manager page is loaded
        localStorage.setItem('session_timeout_seconds', response_map.session_timeout_seconds);
        localStorage.setItem('login_time_miliseconds', login_time);
        localStorage.setItem('SLDBUsername', response_map.username);
        localStorage.setItem('SLToken', response_map.token);
        dispatch({ type: 'LOGIN_FULFILLED', payload: { username: response_map.username } });
      })
      .catch(error => {
        dispatch({ type: 'LOGIN_REJECTED', payload: error });
      });
  }
}

export const logout = (history) => {
  return dispatch => {
    localStorage.removeItem(SLDBUSERNAME);
    localStorage.removeItem(SL_TOKEN);
    localStorage.removeItem(KEY_LOGIN_TIME_MILI);
    localStorage.removeItem(KEY_SESSION_TIMEOUT_SECS);
    axios.defaults.headers.common['Authorization'] = '';
    dispatch({ type: 'LOGOUT' });
    history.push('/login');
    return;
  }
}
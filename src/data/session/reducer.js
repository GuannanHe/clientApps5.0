const initUser = {
  active: false,
  api_key: '',
  apps: {},
  basic_access: '',
  created: '',
  created_by: '',
  disallowed_auth: null,
  failed_passwd_auths: 0,
  first_failed_auth: '',
  first_name: '',
  groups: {},
  last_name: '',
  last_updated: '',
  lockout_failure_count: 0,
  lockout_start_time: null,
  org_snodes: {},
  password_expired: false,
  password_last_updated: '',
  reset_timestamp: '',
  settings: {},
  subscriber_ids: [],
  ui_access: false,
  user_id: '',
  username: '',
  utility: false,
};

const initState = {
  authenticating: false,
  authenticated: false,
  authError: null,
  fetching: false,
  user: initUser,
  sessionUsername: '',
  activeOrgId: undefined,
  updating: false,
  updateError: null,
  sessionError: null,
};

function getActiveOrg(payload) {
  let activeOrgName = payload.settings.active_org || '';
  activeOrgName = activeOrgName.replace(/\//, ''),
  activeOrgName = activeOrgName || '/';

  let ret = undefined;
  for ( let snodeId in payload.org_snodes ) {
    if(payload.org_snodes.hasOwnProperty(snodeId)) {
      let targetSnode = payload.org_snodes[snodeId];
      if ( targetSnode.name === activeOrgName ) {
        ret = snodeId;
      }
    }
  }
  return ret;
}

export default function sessionReducer(state = initState, action = {}) {
  switch (action.type) {
    case 'LOGIN_PENDING':
      return { ...state, authenticating: true, authenticated: false, authError: null };
    case 'LOGIN_FULFILLED':
      return { ...state,
        authenticating: false,
        authenticated: true,
        sessionUsername: action.payload.username,
      };
    case 'LOGIN_REJECTED':
      return {
        ...state,
        authenticating: false,
        authenticated: false,
        authError: action.payload,
      };
    case 'FETCH_SESSION_USER_PENDING':
      return { ...state,
        fetching: true,
        user: initUser,
        sessionError: null,
      };
    case 'FETCH_SESSION_USER_FULFILLED':
      return { ...state,
        fetching: false,
        user: action.payload,
        sessionError: null,
        activeOrgId: getActiveOrg(action.payload),
      };
    case 'FETCH_SESSION_USER_REJECTED':
      return { ...state,
        fetching: false,
        user: initUser,
        sessionError: action.payload,
      };
    case 'UPDATE_USER_PENDING':
      return { ...state,
        updating: true,
        updateError: null,
      };
    case 'UPDATE_USER_FULFILLED':
      return { ...state, updating: false };
    case 'UPDATE_USER_REJECTED':
      return { ...state,
        updating: false,
        updateError: action.payload,
      };
    default:
      return state;
  }
}

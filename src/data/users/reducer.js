const initState = {
  listFetching: false,
  users: [],
  error: null,
  user: {},
  userFetching: false,
  userError: null,
  updating: false,
  updateError: null,
};

export default function userReducer(state = initState, action = {}) {
  switch (action.type) {
    case 'FETCH_USER_LIST_PENDING':
      return { ...state, listFetching: true };
    case 'FETCH_USER_LIST_FULFILLED':
      return { ...state,
        listFetching: false,
        users: action.payload.users,
        error: null,
      };
    case 'FETCH_USER_LIST_REJECTED':
      return { ...state,
        listFetching: false,
        users: [],
        error: action.payload,
      };
    case 'FETCH_USER_PENDING':
      return { ...state,
        userFetching: true,
        user: {},
        userError: null,
      };
    case 'FETCH_USER_FULFILLED':
      return { ...state,
        userFetching: false,
        user: action.payload,
        userError: null,
      };
    case 'FETCH_USER_REJECTED':
      return { ...state,
        userFetching: false,
        user: {},
        userError: action.payload,
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

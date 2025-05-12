import ActionTypes from '../Actions/ActionTypes';

const initialState = {
  user: null,
  isLogin: undefined,
  isMuted: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ActionTypes.IS_LOGIN:
      return {
        ...state,
        isLogin: action.payload,
      };
    case ActionTypes.IS_MUTED:
      return {
        ...state,
        isMuted: action.payload,
      };
    default:
      break;
  }
  return state;
};

export default AuthReducer;

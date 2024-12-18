import ActionTypes from '../Actions/ActionTypes';

const initialState = {
  user: null,
  isLogin: false,
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
    default:
      break;
  }
  return state;
};

export default AuthReducer;

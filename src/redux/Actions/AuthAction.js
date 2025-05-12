import ActionTypes from './ActionTypes';

const isLogin = payload => {
  return {
    type: ActionTypes.IS_LOGIN,
    payload,
  };
};
const userData = payload => {
  return {
    type: ActionTypes.SET_USER,
    payload,
  };
};
const setIsMute = payload => {
  return {
    type: ActionTypes.IS_MUTED,
    payload,
  };
};

export {isLogin, userData, setIsMute};

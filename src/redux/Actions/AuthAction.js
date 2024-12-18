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

export {isLogin, userData};

import ActionTypes from '../Actions/ActionTypes';

const initialState = {
  posts: [],
};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ALL_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    default:
      break;
  }
  return state;
};

export default PostReducer;

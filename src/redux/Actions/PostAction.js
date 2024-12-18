import ActionTypes from './ActionTypes';

const AddPost = payload => {
  return {
    type: 'ADD_POST',
    payload,
  };
};

const DeletePost = payload => {
  return {
    type: 'DELETE_POST',
  };
};
const allPosts = payload => {
  return {
    type: ActionTypes.ALL_POSTS,
    payload,
  };
};
export {AddPost, DeletePost, allPosts};

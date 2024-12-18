import AuthReducer from './AuthReducer';
import PostReducer from './PostReducer';
import {combineReducers} from 'redux';

const AllReducers = combineReducers({
  PostReducer,
  AuthReducer,
});

export default AllReducers;

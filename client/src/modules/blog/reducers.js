import { combineReducers } from 'redux';

import * as actionTypes from './actionTypes';

const postsReducer = (state = [], action = {}) => {
  switch (action.type) {
    case actionTypes.POSTS_LOADED: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

const postReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case actionTypes.POST_LOADED: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

const commentsReducer = (state = [], action = {}) => {
  switch (action.type) {
    case actionTypes.COMMENTS_LOADED: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

const reducer = combineReducers({
  posts: postsReducer,
  post: postReducer,
  comments: commentsReducer,
});

export default reducer;

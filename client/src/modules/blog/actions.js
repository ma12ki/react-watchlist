import * as actionTypes from './actionTypes';

export const postsLoaded = (posts) => ({
  type: actionTypes.POSTS_LOADED,
  payload: posts,
});

export const postLoaded = (post) => ({
  type: actionTypes.POST_LOADED,
  payload: post,
});

export const commentsLoaded = (comments) => ({
  type: actionTypes.COMMENTS_LOADED,
  payload: comments
});

/* eslint-disable react/display-name */
/* eslint-disable react/no-multi-comp */

import React from 'react';

import * as actionTypes from './actionTypes';
import * as actions from './actions';
import service from './service';
import { CommentList, PostList, PostDetails } from './components';

const routes = {
  [actionTypes.ROUTE_POSTS]: {
    path: '/posts',
    component: () => <PostList />,
    thunk: async (dispatch) => {
      const posts = await service.getPosts();

      dispatch(actions.postsLoaded(posts));
    },
  },
  [actionTypes.ROUTE_POST]: {
    path: '/posts/:id',
    component: () => <PostDetails />,
    thunk: async (dispatch, getState) => {
      const { id } = getState().location.payload;
      const post = await service.getPost(id);

      dispatch(actions.postLoaded(post));
    },
  },
  [actionTypes.ROUTE_COMMENTS]: {
    path: '/posts/:id/comments',
    component: () => <CommentList />,
    thunk: async (dispatch, getState) => {
      const { id } = getState().location.payload;
      const comments = await service.getComments(id);

      dispatch(actions.commentsLoaded(comments));
    },
  },
};

export default routes;

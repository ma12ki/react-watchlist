import { moduleName } from './constants';

const getBlog = (state) => state[moduleName];

const getPosts = (state) => getBlog(state).posts;
const getPost = (state) => getBlog(state).post;
const getComments = (state) => getBlog(state).comments;

export {
  getPosts,
  getPost,
  getComments,
};

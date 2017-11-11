import { moduleName } from './constants';

const getNested = (state) => state[moduleName];

const getShowChild = (state) => getNested(state).showChild;
const getChild = (state) => getNested(state).child;
const getShowGrandchild = (state) => getNested(state).showGrandchild;
const getGrandchild = (state) => getNested(state).grandchild;

export {
  getShowChild,
  getChild,
  getShowGrandchild,
  getGrandchild,
};

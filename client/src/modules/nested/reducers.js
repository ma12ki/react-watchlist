import { combineReducers } from 'redux';

import * as actionTypes from './actionTypes';

const showChildReducer = (state = false, action = {}) => {
  switch (action.type) {
    case actionTypes.ROUTE_NESTED: {
      return action.payload.child !== undefined;
    }
    default: {
      return state;
    }
  }
};

const childReducer = (state = '', action = {}) => {
  switch (action.type) {
    case actionTypes.ROUTE_NESTED: {
      return action.payload.child || '';
    }
    default: {
      return state;
    }
  }
};

const showGrandchildReducer = (state = false, action = {}) => {
  switch (action.type) {
    case actionTypes.ROUTE_NESTED: {
      return action.payload.grandchild !== undefined;
    }
    default: {
      return state;
    }
  }
};

const grandchildReducer = (state = '', action = {}) => {
  switch (action.type) {
    case actionTypes.ROUTE_NESTED: {
      return action.payload.grandchild || '';
    }
    default: {
      return state;
    }
  }
};

const reducer = combineReducers({
  showChild: showChildReducer,
  child: childReducer,
  showGrandchild: showGrandchildReducer,
  grandchild: grandchildReducer,
});

export default reducer;

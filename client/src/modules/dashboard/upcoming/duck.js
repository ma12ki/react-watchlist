import { combineReducers } from 'redux';

import { moduleName } from './constants';
import { dashboardModuleSel } from '../common';

//
// actions
//
export const AVAILABLE_REQUEST = `${moduleName}/AVAILABLE_REQUEST`;
export const AVAILABLE_RESPONSE = `${moduleName}/AVAILABLE_RESPONSE`;
export const AVAILABLE_ERROR = `${moduleName}/AVAILABLE_ERROR`;
export const availableRequest = () => ({ type: AVAILABLE_REQUEST });
export const availableResponse = () => ({ type: AVAILABLE_RESPONSE });
export const availableError = () => ({ type: AVAILABLE_ERROR });

//
// selectors
//
const moduleSel = state => dashboardModuleSel(state)[moduleName];
export const loadingSel = state => moduleSel(state).loading;
export const itemsSel = state => moduleSel(state).items;
export const errorSel = state => moduleSel(state).error;

//
// reducers
//
const loading = (state = false, { type }) => {
  switch (type) {
    case AVAILABLE_REQUEST: {
      return true;
    }
    case AVAILABLE_RESPONSE:
    case AVAILABLE_ERROR: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const items = (state = [], { type, payload }) => {
  switch (type) {
    case AVAILABLE_REQUEST:
    case AVAILABLE_ERROR: {
      return [];
    }
    case AVAILABLE_RESPONSE: {
      return payload;
    }
    default: {
      return state;
    }
  }
};

const error = (state = null, { type, payload }) => {
  switch (type) {
    case AVAILABLE_REQUEST:
    case AVAILABLE_RESPONSE: {
      return true;
    }
    case AVAILABLE_ERROR: {
      return payload;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  loading,
  items,
  error,
});

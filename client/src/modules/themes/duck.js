import { combineReducers } from 'redux';

import { moduleName } from './constants';
import { storeTheme } from './services';

//
// actions
//
export const SET_THEME = `${moduleName}/SET_THEME`;

export const setTheme = (theme) => (dispatch) => {
  dispatch({ type: SET_THEME, payload: theme });
  storeTheme(theme);
};

//
// reducers
//
const currentThemeReducer = (state = '', action = {}) => {
  switch (action.type) {
    case SET_THEME: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default combineReducers({
  currentTheme: currentThemeReducer,
});

//
// selectors
//
const getModule = (state) => state[moduleName];
export const getCurrentTheme = (state) => getModule(state).currentTheme;

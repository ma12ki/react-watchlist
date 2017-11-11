import { combineReducers } from 'redux';

import { SET_THEME } from './actionTypes';

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

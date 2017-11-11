import { SET_THEME } from './actionTypes';
import { applyTheme } from './service';

const setTheme = (theme) => (dispatch) => {
  dispatch({ type: SET_THEME, payload: theme });
  applyTheme(theme);
};

export {
  setTheme,
};

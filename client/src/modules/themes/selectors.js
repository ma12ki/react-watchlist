import { moduleName } from './constants';

const getModule = (state) => state[moduleName];
const getCurrentTheme = (state) => getModule(state).currentTheme;

export {
  getCurrentTheme,
};

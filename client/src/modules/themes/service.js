import { themeStorageKey, themes } from './constants';

const restoreTheme = () => {
  const theme = retrieveTheme();

  applyTheme(theme);

  return theme;
};

const retrieveTheme = () => localStorage.getItem(themeStorageKey) || getDefaultTheme();

const getDefaultTheme = () => Object.keys(themes)[0];

const applyTheme = (theme) => {
  localStorage.setItem(themeStorageKey, theme);

  document.documentElement.setAttribute('theme', theme);
};

export {
  restoreTheme,
  retrieveTheme,
  applyTheme,
  getDefaultTheme,
};

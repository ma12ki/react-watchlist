import { themeStorageKey, themes } from './constants';

const retrieveTheme = () => localStorage.getItem(themeStorageKey) || getDefaultTheme();

const getDefaultTheme = () => Object.keys(themes)[0];

const storeTheme = (theme) => localStorage.setItem(themeStorageKey, theme);

export {
  retrieveTheme,
  storeTheme,
};

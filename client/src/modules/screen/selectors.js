import { moduleName, phone, tablet, desktop } from './constants';

const getModule = (state) => state[moduleName];
const getMode = (state) => getModule(state).mode;
const getIsPhone = (state) => getMode(state) === phone;
const getIsTablet = (state) => getMode(state) === tablet;
const getIsDesktop = (state) => getMode(state) === desktop;
const getWidth = (state) => getModule(state).width;
const getHeight = (state) => getModule(state).height;

export {
  getModule,
  getMode,
  getIsPhone,
  getIsTablet,
  getIsDesktop,
  getWidth,
  getHeight,
};

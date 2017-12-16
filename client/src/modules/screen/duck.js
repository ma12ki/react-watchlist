import { moduleName, phone, tablet, desktop } from './constants';

//
// actions
//
export const SET_SCREEN_META = `${moduleName}/SET_SCREEN_META`;
export const setScreenMeta = (meta) => ({ type: SET_SCREEN_META, payload: meta });

//
// selectors
//
const moduleSel = (state) => state[moduleName];
export const modeSel = (state) => moduleSel(state).mode;
export const isPhoneSel = (state) => modeSel(state) === phone;
export const isTabletSel = (state) => modeSel(state) === tablet;
export const isDesktopSel = (state) => modeSel(state) === desktop;

//
// reducers
//
const screen = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_SCREEN_META: {
      return payload;
    }
    default: {
      return state;
    }
  }
};

export default screen;
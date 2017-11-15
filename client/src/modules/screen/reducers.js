import { SET_SCREEN_META } from './actionTypes';

const screen = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SCREEN_META: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
};

export default screen;

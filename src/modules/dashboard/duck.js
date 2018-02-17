import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import { resetOnLogoutReducer } from '../utils';
import {
  moduleName as calendarModuleName,
  reducers as calendarReducers,
  epics as calendarEpics,
} from './calendar';
import {
  moduleName as timelineModuleName,
  reducers as timelineReducers,
  epics as timelineEpics,
} from './timeline';
import { moduleName } from './constants';


//
// actions
//
export { ROUTE_DASHBOARD } from './common';

export const SET_VIEW = `${moduleName}/SET_VIEW`;
export const setView = view => ({ type: SET_VIEW, payload: view });

//
// reducers
//
const view = (state = 'calendar', { type, payload }) => {
  switch (type) {
    case SET_VIEW: {
      return payload;
    }
    default: {
      return state;
    }
  }
};

const reducers = combineReducers({
  view,
  [calendarModuleName]: calendarReducers,
  [timelineModuleName]: timelineReducers,
});

export default resetOnLogoutReducer(reducers);

//
// selectors
//
export { preferredViewSel, effectiveViewSel } from './common';

//
// epics
//
export const epics = combineEpics(
  calendarEpics,
  timelineEpics,
);

import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';

import {
  moduleName as calendarModuleName,
  reducers as calendarReducers,
  epics as calendarEpics,
} from './calendar';
import { moduleName } from './constants';

//
// actions
//
export const ROUTE_DASHBOARD = `${moduleName}/ROUTE_DASHBOARD`;

//
// reducers
//
const reducers = combineReducers({
  [calendarModuleName]: calendarReducers,
});

export default reducers;

//
// epics
//
export const epics = combineEpics(
  calendarEpics
);

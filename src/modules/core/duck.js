import { combineEpics } from 'redux-observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {
  moduleName as themesModuleName,
  reducers as themesReducers,
} from '../themes';
import {
  moduleName as screenModuleName,
  reducers as screenReducers,
} from '../screen';
import {
  moduleName as dashboardModuleName,
  reducers as dashboardReducers,
  epics as dashboardEpics,
} from '../dashboard';
import {
  moduleName as showOperationsModuleName,
  reducers as showOperationsReducers,
  epics as showOperationsEpics,
} from '../showOperations';
import {
  moduleName as showsModuleName,
  reducers as showsReducers,
  epics as showsEpics,
} from '../shows';
import {
  moduleName as userModuleName,
  reducers as userReducers,
  epics as userEpics,
} from '../user';

//
// reducers
//
export default {
  [themesModuleName]: themesReducers,
  [screenModuleName]: screenReducers,
  [dashboardModuleName]: dashboardReducers,
  [showOperationsModuleName]: showOperationsReducers,
  [showsModuleName]: showsReducers,
  [userModuleName]: userReducers,
};

//
// epics
//
export const epic$ = new BehaviorSubject(combineEpics(
  dashboardEpics,
  showOperationsEpics,
  showsEpics,
  userEpics,
));
export const epics = (action$, store) => epic$.mergeMap(epic => epic(action$, store));

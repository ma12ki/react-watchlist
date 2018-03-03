import { combineEpics } from 'redux-observable';

import { moduleName as themesModuleName, reducers as themesReducers } from '../themes';
import { moduleName as screenModuleName, reducers as screenReducers } from '../screen';
import { moduleName as dashboardModuleName, reducers as dashboardReducers } from '../dashboard';
import { moduleName as showOperationsModuleName, reducers as showOperationsReducers } from '../showOperations';
import { moduleName as showsModuleName, reducers as showsReducers } from '../shows';
import { moduleName as usersModuleName, reducers as usersReducers } from '../users';
import { moduleName as userModuleName, reducers as userReducers } from '../user';

import { epics as dashboardEpics } from '../dashboard';
import { epics as showOperationsEpics } from '../showOperations';
import { epics as showsEpics } from '../shows';
import { epics as usersEpics } from '../users';
import { epics as userEpics } from '../user';

//
// actions
//

//
// reducers
//
export default {
  [themesModuleName]: themesReducers,
  [screenModuleName]: screenReducers,
  [dashboardModuleName]: dashboardReducers,
  [showOperationsModuleName]: showOperationsReducers,
  [showsModuleName]: showsReducers,
  [usersModuleName]: usersReducers,
  [userModuleName]: userReducers,
};

//
// selectors
//

//
// epics
//
export const epics = combineEpics(
  dashboardEpics,
  showOperationsEpics,
  showsEpics,
  usersEpics,
  userEpics,
);

//
// services
//

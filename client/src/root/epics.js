import { combineEpics } from 'redux-observable';

import { epics as dashboardEpics } from '../modules/dashboard';
import { epics as showOperationsEpics } from '../modules/showOperations';
import { epics as showsEpics } from '../modules/shows';

export default combineEpics(
  dashboardEpics,
  showOperationsEpics,
  showsEpics,
);

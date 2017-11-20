import { combineEpics } from 'redux-observable';

import dashboard from '../modules/dashboard/epics';

export default combineEpics(
  dashboard
);

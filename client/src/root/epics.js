import { combineEpics } from 'redux-observable';

import { epics as dashboardEpics } from '../modules/dashboard';

export default combineEpics(dashboardEpics);

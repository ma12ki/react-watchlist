import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/switchMap';

import { moduleName } from './constants';

//
// actions
//
export const ROUTE_LOL = `${moduleName}/ROUTE_LOL`;

//
// reducers
//
const mao = (state = {}) => {
  return state;
};

export default combineReducers(mao);

//
// epics
//
const roflEpic$ = action$ => action$
  .ofType('XDDD')
  .mapTo({ type: '%)%)%)%'});

export const epics = combineEpics(
  roflEpic$,
);

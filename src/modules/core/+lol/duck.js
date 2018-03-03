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

export const LOL = `${moduleName}/LOL`;
export const MAO = `${moduleName}/MAO`;

//
// reducers
//
const mao = (state = 'RROFFFFLLLllzzzzz xDD') => {
  return state;
};

export default combineReducers({ mao });

//
// selectors
//
export const maoSel = state => state[moduleName].mao;

//
// epics
//
const roflEpic$ = action$ => action$
  .ofType(LOL)
  .mapTo({ type: MAO });

export const epics = combineEpics(
  roflEpic$,
);

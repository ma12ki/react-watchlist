import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

// import { apiService } from '../../utils';
import { moduleName } from './constants';

//
// actions
//
export const OPEN_CREATE_SHOW = `${moduleName}/OPEN_CREATE_SHOW`;
export const CREATE_SHOW_REQUEST = `${moduleName}/CREATE_SHOW_REQUEST`;
export const CREATE_SHOW_RESPONSE = `${moduleName}/CREATE_SHOW_RESPONSE`;
export const CREATE_SHOW_ERROR = `${moduleName}/CREATE_SHOW_ERROR`;
export const openCreateShow = () => ({ type: OPEN_CREATE_SHOW });
export const createShowRequest = show => ({ type: CREATE_SHOW_REQUEST, payload: show });
export const createShowResponse = show => ({ type: CREATE_SHOW_RESPONSE, payload: show });
export const createShowError = err => ({ type: CREATE_SHOW_ERROR, payload: err });

export const OPEN_UPDATE_SHOW = `${moduleName}/OPEN_UPDATE_SHOW`;
export const UPDATE_SHOW_REQUEST = `${moduleName}/UPDATE_SHOW_REQUEST`;
export const UPDATE_SHOW_RESPONSE = `${moduleName}/UPDATE_SHOW_RESPONSE`;
export const UPDATE_SHOW_ERROR = `${moduleName}/UPDATE_SHOW_ERROR`;
export const openUpdateShow = show => ({ type: OPEN_UPDATE_SHOW, payload: show });
export const updateShowRequest = show => ({ type: UPDATE_SHOW_REQUEST, payload: show });
export const updateShowResponse = show => ({ type: UPDATE_SHOW_RESPONSE, payload: show });
export const updateShowError = err => ({ type: UPDATE_SHOW_ERROR, payload: err });

export const DELETE_SHOW_REQUEST = `${moduleName}/DELETE_SHOW_REQUEST`;
export const DELETE_SHOW_RESPONSE = `${moduleName}/DELETE_SHOW_RESPONSE`;
export const DELETE_SHOW_ERROR = `${moduleName}/DELETE_SHOW_ERROR`;
export const deleteShowRequest = showId => ({ type: DELETE_SHOW_REQUEST, payload: showId });
export const deleteShowResponse = showId => ({ type: DELETE_SHOW_RESPONSE, payload: showId });
export const deleteShowError = err => ({ type: DELETE_SHOW_ERROR, payload: err });

//
// reducers
//
const createLoading = (state = false, { type }) => {
  switch (type) {
    case CREATE_SHOW_REQUEST: {
      return true;
    }
    case CREATE_SHOW_RESPONSE:
    case CREATE_SHOW_ERROR: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const updateLoading = (state = false, { type }) => {
  switch (type) {
    case UPDATE_SHOW_REQUEST: {
      return true;
    }
    case UPDATE_SHOW_RESPONSE:
    case UPDATE_SHOW_ERROR: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const deleteLoading = (state = false, { type }) => {
  switch (type) {
    case DELETE_SHOW_REQUEST: {
      return true;
    }
    case DELETE_SHOW_RESPONSE:
    case DELETE_SHOW_ERROR: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const reducers = combineReducers({
  createLoading,
  updateLoading,
  deleteLoading,
});

export default reducers;

//
// selectors
//
const moduleSel = state => state[moduleName];

export const createLoadingSel = state => moduleSel(state).createLoading;
export const updateLoadingSel = state => moduleSel(state).updateLoading;
export const deleteLoadingSel = state => moduleSel(state).deleteLoading;

//
// epics
//
const createShowEpic$ = action$ => action$
  .ofType(CREATE_SHOW_REQUEST)
  .switchMap(() => createShow$()
    .map(createShowResponse)
    .catch(err => Observable.of(createShowError(err))));

const updateShowEpic$ = action$ => action$
  .ofType(UPDATE_SHOW_REQUEST)
  .switchMap(() => updateShow$()
    .map(updateShowResponse)
    .catch(err => Observable.of(updateShowError(err))));

const deleteShowEpic$ = action$ => action$
  .ofType(DELETE_SHOW_REQUEST)
  .switchMap(() => deleteShow$()
    .map(deleteShowResponse)
    .catch(err => Observable.of(deleteShowError(err))));

export const epics = combineEpics(
  createShowEpic$,
  updateShowEpic$,
  deleteShowEpic$,
);

//
// services
//

const createShow$ = () => Observable.of({}).delay(1000);

const updateShow$ = () => Observable.of({}).delay(1000);

const deleteShow$ = () => Observable.of({}).delay(1000);

import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { toast } from 'react-toastify';

// import { apiService } from '../../utils';
import { moduleName } from './constants';

//
// actions
//
export const OPEN_EDIT_SHOW = `${moduleName}/OPEN_EDIT_SHOW`;
export const CLOSE_EDIT_SHOW = `${moduleName}/CLOSE_EDIT_SHOW`;
export const openEditShow = (show = {}) => ({ type: OPEN_EDIT_SHOW, payload: show });
export const closeEditShow = () => ({ type: CLOSE_EDIT_SHOW });

export const EDIT_SHOW_REQUEST = `${moduleName}/EDIT_SHOW_REQUEST`;
export const EDIT_SHOW_RESPONSE = `${moduleName}/EDIT_SHOW_RESPONSE`;
export const EDIT_SHOW_ERROR = `${moduleName}/EDIT_SHOW_ERROR`;
export const editShowRequest = show => ({ type: EDIT_SHOW_REQUEST, payload: show });
export const editShowResponse = show => ({ type: EDIT_SHOW_RESPONSE, payload: show });
export const editShowError = err => ({ type: EDIT_SHOW_ERROR, payload: err });

export const DELETE_SHOW_REQUEST = `${moduleName}/DELETE_SHOW_REQUEST`;
export const DELETE_SHOW_RESPONSE = `${moduleName}/DELETE_SHOW_RESPONSE`;
export const DELETE_SHOW_ERROR = `${moduleName}/DELETE_SHOW_ERROR`;
export const deleteShowRequest = showId => ({ type: DELETE_SHOW_REQUEST, payload: showId });
export const deleteShowResponse = showId => ({ type: DELETE_SHOW_RESPONSE, payload: showId });
export const deleteShowError = err => ({ type: DELETE_SHOW_ERROR, payload: err });

//
// reducers
//
const editLoading = (state = false, { type }) => {
  switch (type) {
    case EDIT_SHOW_REQUEST: {
      return true;
    }
    case EDIT_SHOW_RESPONSE:
    case EDIT_SHOW_ERROR: {
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

const editModalVisible = (state = false, { type }) => {
  switch (type) {
    case OPEN_EDIT_SHOW: {
      return true;
    }
    case CLOSE_EDIT_SHOW:
    case EDIT_SHOW_RESPONSE: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const show = (state = {}, { type, payload }) => {
  switch (type) {
    case OPEN_EDIT_SHOW: {
      return payload;
    }
    case CLOSE_EDIT_SHOW: {
      return {};
    }
    default: {
      return state;
    }
  }
};

const reducers = combineReducers({
  editLoading,
  deleteLoading,
  editModalVisible,
  show,
});

export default reducers;

//
// selectors
//
const moduleSel = state => state[moduleName];

export const editLoadingSel = state => moduleSel(state).editLoading;
export const deleteLoadingSel = state => moduleSel(state).deleteLoading;
export const editModalVisibleSel = state => moduleSel(state).editModalVisible;
export const showSel = state => moduleSel(state).show;

//
// epics
//
const editShowEpic$ = action$ => action$
  .ofType(EDIT_SHOW_REQUEST)
  .switchMap(({ payload: show }) => {
    const editMode = show.showId == null;
    const request$ = editMode ? createShow$(show) : updateShow$(show);

    return request$
      .map(editShowResponse)
      .do(() => editMode ? toast.success(`"${show.title}" updated`) : toast.success(`"${show.title}" created`))
      .catch(err => Observable.of(editShowError(err)));
  });

const deleteShowEpic$ = action$ => action$
  .ofType(DELETE_SHOW_REQUEST)
  .switchMap(({ payload }) => deleteShow$()
    .map(deleteShowResponse)
    .do(() => toast.success(`"${payload.title}" removed`))
    .catch(err => Observable.of(deleteShowError(err))));

export const epics = combineEpics(
  editShowEpic$,
  deleteShowEpic$,
);

//
// services
//
const createShow$ = () => Observable.of({}).delay(1000);

const updateShow$ = () => Observable.of({}).delay(1000);

const deleteShow$ = () => Observable.of({}).delay(1000);

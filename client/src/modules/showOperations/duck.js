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
export const deleteShowRequest = (title, showId, season, episode) => ({ type: DELETE_SHOW_REQUEST, payload: { title, showId, season, episode } });
export const deleteShowResponse = (title, showId, season, episode) => ({ type: DELETE_SHOW_RESPONSE, payload: { title, showId, season, episode } });
export const deleteShowError = (title, showId, err) => ({ type: DELETE_SHOW_ERROR, payload: { title, showId, err } });

export const MARK_WATCHED_REQUEST = `${moduleName}/MARK_WATCHED_REQUEST`;
export const MARK_WATCHED_RESPONSE = `${moduleName}/MARK_WATCHED_RESPONSE`;
export const MARK_WATCHED_ERROR = `${moduleName}/MARK_WATCHED_ERROR`;
export const markWatchedRequest = (showId, episodeId, title) => ({ type: MARK_WATCHED_REQUEST, payload: { showId, episodeId, title } });
export const markWatchedResponse = (showId, episodeId, title) => ({ type: MARK_WATCHED_RESPONSE, payload: { showId, episodeId, title } });
export const markWatchedError = (showId, episodeId, title, err) => ({ type: MARK_WATCHED_ERROR, payload: { showId, episodeId, title, err } });

export const FOLLOW_REQUEST = `${moduleName}/FOLLOW_REQUEST`;
export const FOLLOW_RESPONSE = `${moduleName}/FOLLOW_RESPONSE`;
export const FOLLOW_ERROR = `${moduleName}/FOLLOW_ERROR`;
export const followRequest = (showId, title) => ({ type: FOLLOW_REQUEST, payload: { showId, title } });
export const followResponse = (showId, title) => ({ type: FOLLOW_RESPONSE, payload: { showId, title } });
export const followError = (showId, title, err) => ({ type: FOLLOW_ERROR, payload: { showId, title, err } });

//
// reducers
//
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

const operationLoading = (state = {}, { type, payload }) => {
  switch (type) {
    case MARK_WATCHED_REQUEST:
    case FOLLOW_REQUEST:
    case DELETE_SHOW_REQUEST: {
      return {
        ...state,
        [payload.showId]: true,
      };
    }
    case MARK_WATCHED_RESPONSE:
    case MARK_WATCHED_ERROR:
    case FOLLOW_RESPONSE:
    case FOLLOW_ERROR:
    case DELETE_SHOW_RESPONSE:
    case DELETE_SHOW_ERROR: {
      return {
        ...state,
        [payload.showId]: false,
      };
    }
    default: {
      return state;
    }
  }
};

const reducers = combineReducers({
  editLoading,
  operationLoading,
  editModalVisible,
  show,
});

export default reducers;

//
// selectors
//
const moduleSel = state => state[moduleName];

export const editLoadingSel = state => moduleSel(state).editLoading;
export const operationLoadingSel = (state, showId) => moduleSel(state).operationLoading[showId] || false;
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

const markWatchedEpic$ = action$ => action$
  .ofType(MARK_WATCHED_REQUEST)
  .switchMap(({ payload }) => markWatched$(/* episodeId */)
    .map(() => markWatchedResponse(payload.showId, payload.episodeId, payload.title))
    .do(() => toast.success(`"${payload.title}" marked watched`))
    .catch(err => Observable.of(markWatchedError(err))));

const followEpic$ = action$ => action$
  .ofType(FOLLOW_REQUEST)
  .switchMap(({ payload }) => follow$(/* showId */)
    .map(() => followResponse(payload.showId, payload.title))
    .do(() => toast.success(`Following "${payload.title}"`))
    .catch(err => Observable.of(followError(err))));

export const epics = combineEpics(
  editShowEpic$,
  deleteShowEpic$,
  markWatchedEpic$,
  followEpic$,
);

//
// services
//
const createShow$ = () => Observable.of({}).delay(1000);

const updateShow$ = () => Observable.of({}).delay(1000);

const deleteShow$ = () => Observable.of({}).delay(1000);

const markWatched$ = (/* episodeId */) => Observable.of({}).delay(1000);

const follow$ = (/* showId */) => Observable.of({}).delay(1000);

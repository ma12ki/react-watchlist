import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { toast } from 'react-toastify';

// import { apiService } from '../../utils';
import { moduleName } from './constants';

//
// actions
//
export const MARK_WATCHED_REQUEST = `${moduleName}/MARK_WATCHED_REQUEST`;
export const MARK_WATCHED_RESPONSE = `${moduleName}/MARK_WATCHED_RESPONSE`;
export const MARK_WATCHED_ERROR = `${moduleName}/MARK_WATCHED_ERROR`;
export const markWatchedRequest = (showId, episodeId) => ({ type: MARK_WATCHED_REQUEST, payload: { showId, episodeId } });
export const markWatchedResponse = (showId, episodeId) => ({ type: MARK_WATCHED_RESPONSE, payload: { showId, episodeId } });
export const markWatchedError = (showId, episodeId, err) => ({ type: MARK_WATCHED_ERROR, payload: { showId, episodeId, err } });

export const FOLLOW_REQUEST = `${moduleName}/FOLLOW_REQUEST`;
export const FOLLOW_RESPONSE = `${moduleName}/FOLLOW_RESPONSE`;
export const FOLLOW_ERROR = `${moduleName}/FOLLOW_ERROR`;
export const followRequest = showId => ({ type: FOLLOW_REQUEST, payload: { showId } });
export const followResponse = showId => ({ type: FOLLOW_RESPONSE, payload: { showId } });
export const followError = (showId, err) => ({ type: FOLLOW_ERROR, payload: { showId, err } });

//
// reducers
//
const loading = (state = {}, { type, payload }) => {
  switch (type) {
    case MARK_WATCHED_REQUEST:
    case FOLLOW_REQUEST: {
      return {
        ...state,
        [payload.showId]: true,
      };
    }
    case MARK_WATCHED_RESPONSE:
    case MARK_WATCHED_ERROR:
    case FOLLOW_RESPONSE:
    case FOLLOW_ERROR: {
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
  loading,
});

export default reducers;

//
// selectors
//
const moduleSel = state => state[moduleName];

export const loadingSel = (state, showId) => moduleSel(state).loading[showId] || false;

//
// epics
//
const markWatchedEpic$ = action$ => action$
  .ofType(MARK_WATCHED_REQUEST)
  .switchMap(({ payload }) => markWatched$(/* episodeId */)
    .map(() => markWatchedResponse(payload.showId, payload.episodeId))
    .do(() => toast.success('Marked watched'))
    .catch(err => Observable.of(err)));

const followEpic$ = action$ => action$
  .ofType(FOLLOW_REQUEST)
  .switchMap(({ payload }) => follow$(/* showId */)
    .map(() => followResponse(payload.showId))
    .do(() => toast.success('Following'))
    .catch(err => Observable.of(err)));

export const epics = combineEpics(
  markWatchedEpic$,
  followEpic$,
);

//
// services
//
const markWatched$ = (/* episodeId */) => Observable.of({}).delay(1000);

const follow$ = (/* showId */) => Observable.of({}).delay(1000);

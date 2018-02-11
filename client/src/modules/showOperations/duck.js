import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/concat';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import { toast } from 'react-toastify';

import '../utils/rxjs.add.operator.apiCatch';
import { apiService } from '../utils';
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
export const deleteShowRequest = (showId, title) => ({ type: DELETE_SHOW_REQUEST, payload: { showId, title } });
export const deleteShowResponse = (showId) => ({ type: DELETE_SHOW_RESPONSE, payload: { showId } });
export const deleteShowError = (showId, err) => ({ type: DELETE_SHOW_ERROR, payload: { showId, err } });

export const DELETE_EPISODES_REQUEST = `${moduleName}/DELETE_EPISODES_REQUEST`;
export const DELETE_EPISODES_RESPONSE = `${moduleName}/DELETE_EPISODES_RESPONSE`;
export const DELETE_EPISODES_ERROR = `${moduleName}/DELETE_EPISODES_ERROR`;
export const deleteEpisodesRequest = (showId, season, episode, title) => ({ type: DELETE_EPISODES_REQUEST, payload: { showId, season, episode, title } });
export const deleteEpisodesResponse = (showId, season, episode) => ({ type: DELETE_EPISODES_RESPONSE, payload: { showId, season, episode } });
export const deleteEpisodesError = (showId, err) => ({ type: DELETE_EPISODES_ERROR, payload: { showId, err } });

export const OPEN_POSTPONE_EPISODES = `${moduleName}/OPEN_POSTPONE_EPISODES`;
export const CLOSE_POSTPONE_EPISODES = `${moduleName}/CLOSE_POSTPONE_EPISODES`;
export const openPostponeEpisodes = (showId, season, episode, currentPremiereDate, title) => ({ type: OPEN_POSTPONE_EPISODES, payload: { showId, season, episode, currentPremiereDate, title } });
export const closePostponeEpisodes = () => ({ type: CLOSE_POSTPONE_EPISODES });

export const POSTPONE_EPISODES_REQUEST = `${moduleName}/POSTPONE_EPISODES_REQUEST`;
export const POSTPONE_EPISODES_RESPONSE = `${moduleName}/POSTPONE_EPISODES_RESPONSE`;
export const POSTPONE_EPISODES_ERROR = `${moduleName}/POSTPONE_EPISODES_ERROR`;
export const postponeEpisodesRequest = (showId, season, episode, newPremiereDate, title) => ({ type: POSTPONE_EPISODES_REQUEST, payload: { showId, season, episode, newPremiereDate, title } });
export const postponeEpisodesResponse = showId => ({ type: POSTPONE_EPISODES_RESPONSE, payload: { showId } });
export const postponeEpisodesError = (showId, err) => ({ type: POSTPONE_EPISODES_ERROR, payload: { showId, err } });

export const MARK_WATCHED_REQUEST = `${moduleName}/MARK_WATCHED_REQUEST`;
export const MARK_WATCHED_RESPONSE = `${moduleName}/MARK_WATCHED_RESPONSE`;
export const MARK_WATCHED_ERROR = `${moduleName}/MARK_WATCHED_ERROR`;
export const markWatchedRequest = (showId, episodeId, title) => ({ type: MARK_WATCHED_REQUEST, payload: { showId, episodeId, title } });
export const markWatchedResponse = (showId, episodeId) => ({ type: MARK_WATCHED_RESPONSE, payload: { showId, episodeId } });
export const markWatchedError = (showId, err) => ({ type: MARK_WATCHED_ERROR, payload: { showId, err } });

export const UNMARK_WATCHED_REQUEST = `${moduleName}/UNMARK_WATCHED_REQUEST`;
export const UNMARK_WATCHED_RESPONSE = `${moduleName}/UNMARK_WATCHED_RESPONSE`;
export const UNMARK_WATCHED_ERROR = `${moduleName}/UNMARK_WATCHED_ERROR`;
export const unmarkWatchedRequest = (showId, episodeId, title) => ({ type: UNMARK_WATCHED_REQUEST, payload: { showId, episodeId, title } });
export const unmarkWatchedResponse = (showId, episodeId) => ({ type: UNMARK_WATCHED_RESPONSE, payload: { showId, episodeId } });
export const unmarkWatchedError = (showId, err) => ({ type: UNMARK_WATCHED_ERROR, payload: { showId, err } });

export const MARK_WATCHED_BULK_REQUEST = `${moduleName}/MARK_WATCHED_BULK_REQUEST`;
export const MARK_WATCHED_BULK_RESPONSE = `${moduleName}/MARK_WATCHED_BULK_RESPONSE`;
export const MARK_WATCHED_BULK_ERROR = `${moduleName}/MARK_WATCHED_BULK_ERROR`;
export const markWatchedBulkRequest = (showId, season, episode, title) => ({ type: MARK_WATCHED_BULK_REQUEST, payload: { showId, season, episode, title } });
export const markWatchedBulkResponse = (showId, season, episode) => ({ type: MARK_WATCHED_BULK_RESPONSE, payload: { showId, season, episode } });
export const markWatchedBulkError = (showId, err) => ({ type: MARK_WATCHED_BULK_ERROR, payload: { showId, err } });

export const UNMARK_WATCHED_BULK_REQUEST = `${moduleName}/UNMARK_WATCHED_BULK_REQUEST`;
export const UNMARK_WATCHED_BULK_RESPONSE = `${moduleName}/UNMARK_WATCHED_BULK_RESPONSE`;
export const UNMARK_WATCHED_BULK_ERROR = `${moduleName}/UNMARK_WATCHED_BULK_ERROR`;
export const unmarkWatchedBulkRequest = (showId, season, episode, title) => ({ type: UNMARK_WATCHED_BULK_REQUEST, payload: { showId, season, episode, title } });
export const unmarkWatchedBulkResponse = (showId, season, episode) => ({ type: UNMARK_WATCHED_BULK_RESPONSE, payload: { showId, season, episode } });
export const unmarkWatchedBulkError = (showId, err) => ({ type: UNMARK_WATCHED_BULK_ERROR, payload: { showId, err } });

export const FOLLOW_REQUEST = `${moduleName}/FOLLOW_REQUEST`;
export const FOLLOW_RESPONSE = `${moduleName}/FOLLOW_RESPONSE`;
export const FOLLOW_ERROR = `${moduleName}/FOLLOW_ERROR`;
export const followRequest = (showId, title) => ({ type: FOLLOW_REQUEST, payload: { showId, title } });
export const followResponse = showId => ({ type: FOLLOW_RESPONSE, payload: { showId } });
export const followError = (showId, err) => ({ type: FOLLOW_ERROR, payload: { showId, err } });

export const UNFOLLOW_REQUEST = `${moduleName}/UNFOLLOW_REQUEST`;
export const UNFOLLOW_RESPONSE = `${moduleName}/UNFOLLOW_RESPONSE`;
export const UNFOLLOW_ERROR = `${moduleName}/UNFOLLOW_ERROR`;
export const unfollowRequest = (showId, title) => ({ type: UNFOLLOW_REQUEST, payload: { showId, title } });
export const unfollowResponse = showId => ({ type: UNFOLLOW_RESPONSE, payload: { showId } });
export const unfollowError = (showId, err) => ({ type: UNFOLLOW_ERROR, payload: { showId, err } });

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

const show = (state = {}, { type, payload = {} }) => {
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

const postponeModalVisible = (state = false, { type }) => {
  switch (type) {
    case OPEN_POSTPONE_EPISODES: {
      return true;
    }
    case CLOSE_POSTPONE_EPISODES:
    case POSTPONE_EPISODES_RESPONSE: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const episodeToPostpone = (state = {}, { type, payload }) => {
  switch (type) {
    case OPEN_POSTPONE_EPISODES: {
      return payload;
    }
    case CLOSE_POSTPONE_EPISODES: {
      return {};
    }
    default: {
      return state;
    }
  }
};

const operationLoading = (state = {}, { type, payload }) => {
  switch (type) {
    case MARK_WATCHED_REQUEST:
    case UNMARK_WATCHED_REQUEST:
    case MARK_WATCHED_BULK_REQUEST:
    case UNMARK_WATCHED_BULK_REQUEST:
    case FOLLOW_REQUEST:
    case UNFOLLOW_REQUEST:
    case DELETE_SHOW_REQUEST:
    case DELETE_EPISODES_REQUEST:
    case POSTPONE_EPISODES_REQUEST: {
      return {
        ...state,
        [payload.showId]: true,
      };
    }
    case MARK_WATCHED_RESPONSE:
    case MARK_WATCHED_ERROR:
    case UNMARK_WATCHED_RESPONSE:
    case UNMARK_WATCHED_ERROR:
    case MARK_WATCHED_BULK_RESPONSE:
    case MARK_WATCHED_BULK_ERROR:
    case UNMARK_WATCHED_BULK_RESPONSE:
    case UNMARK_WATCHED_BULK_ERROR:
    case FOLLOW_RESPONSE:
    case FOLLOW_ERROR:
    case UNFOLLOW_RESPONSE:
    case UNFOLLOW_ERROR:
    case DELETE_SHOW_RESPONSE:
    case DELETE_SHOW_ERROR:
    case DELETE_EPISODES_RESPONSE:
    case DELETE_EPISODES_ERROR:
    case POSTPONE_EPISODES_RESPONSE:
    case POSTPONE_EPISODES_ERROR: {
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
  editModalVisible,
  editLoading,
  show,
  operationLoading,
  postponeModalVisible,
  episodeToPostpone,
});

export default reducers;

//
// selectors
//
const moduleSel = state => state[moduleName];

export const editLoadingSel = state => moduleSel(state).editLoading;
export const editModalVisibleSel = state => moduleSel(state).editModalVisible;
export const showSel = state => moduleSel(state).show;
export const operationLoadingSel = (state, showId) => moduleSel(state).operationLoading[showId] || false;
export const postponeModalVisibleSel = state => moduleSel(state).postponeModalVisible;
export const episodeToPostponeSel = state => moduleSel(state).episodeToPostpone;

//
// epics
//
const editShowEpic$ = (action$, store) => action$
  .ofType(EDIT_SHOW_REQUEST)
  .switchMap(({ payload: show }) => {
    const editMode = show.showId != null;
    const request$ = editMode ? updateShow$(show) : createShow$(show);

    return request$
      .do(() => editMode ? toast(`"${show.title}" updated`) : toast(`"${show.title}" created`))
      .mergeMap(res => {
        const actions = [Observable.of(editShowResponse(res))];
        if (editMode) {
          const state = store.getState();
          const oldShow = showSel(state);
          if (oldShow.title !== res.title) {
            actions.unshift(Observable.of({ type: 'shows/ROUTE_ALL_SHOWS' }));
          }
        }
        return Observable.concat(...actions);
      })
      .apiCatch(err => Observable.of(editShowError(err)));
  });

const deleteShowEpic$ = action$ => action$
  .ofType(DELETE_SHOW_REQUEST)
  .switchMap(({ payload }) => deleteShow$(payload.showId)
    .map(() => deleteShowResponse(payload.showId))
    .do(() => toast(`"${payload.title}" removed`))
    .apiCatch(err => Observable.of(deleteShowError(payload.showId, err))));

const deleteEpisodesEpic$ = action$ => action$
  .ofType(DELETE_EPISODES_REQUEST)
  .switchMap(({ payload }) => deleteEpisodes$(payload.showId, payload.season, payload.episode)
    .map(() => deleteEpisodesResponse(payload.showId, payload.season, payload.episode))
    .do(() => toast(`"${payload.title}" removed`))
    .apiCatch(err => Observable.of(deleteEpisodesError(payload.showId, err))));

const postponeEpisodesEpic$ = action$ => action$
  .ofType(POSTPONE_EPISODES_REQUEST)
  .switchMap(({ payload }) => postponeEpisodes$(payload.showId, payload.season, payload.episode, payload.newPremiereDate)
    .map(() => postponeEpisodesResponse(payload.showId))
    .do(() => toast(`"${payload.title}" postponed`))
    .apiCatch(err => Observable.of(postponeEpisodesError(payload.showId, err))));

const markWatchedEpic$ = action$ => action$
  .ofType(MARK_WATCHED_REQUEST)
  .switchMap(({ payload }) => markWatched$(payload.showId, payload.episodeId)
    .map(() => markWatchedResponse(payload.showId, payload.episodeId))
    .do(() => toast(`"${payload.title}" marked watched`))
    .apiCatch(err => Observable.of(markWatchedError(payload.showId, err))));

const unmarkWatchedEpic$ = action$ => action$
  .ofType(UNMARK_WATCHED_REQUEST)
  .switchMap(({ payload }) => unmarkWatched$(payload.showId, payload.episodeId)
    .map(() => unmarkWatchedResponse(payload.showId, payload.episodeId))
    .do(() => toast(`"${payload.title}" marked NOT watched`))
    .apiCatch(err => Observable.of(unmarkWatchedError(payload.showId, err))));

const markWatchedBulkEpic$ = action$ => action$
  .ofType(MARK_WATCHED_BULK_REQUEST)
  .switchMap(({ payload }) => markWatchedBulk$(payload.showId, payload.season, payload.episode)
    .map(() => markWatchedBulkResponse(payload.showId, payload.season, payload.episode))
    .do(() => toast(`"${payload.title}" marked watched`))
    .apiCatch(err => Observable.of(markWatchedBulkError(payload.showId, err))));

const unmarkWatchedBulkEpic$ = action$ => action$
  .ofType(UNMARK_WATCHED_BULK_REQUEST)
  .switchMap(({ payload }) => unmarkWatchedBulk$(payload.showId, payload.season, payload.episode)
    .map(() => unmarkWatchedBulkResponse(payload.showId, payload.season, payload.episode))
    .do(() => toast(`"${payload.title}" marked NOT watched`))
    .apiCatch(err => Observable.of(unmarkWatchedBulkError(payload.showId, err))));

const followEpic$ = action$ => action$
  .ofType(FOLLOW_REQUEST)
  .switchMap(({ payload }) => follow$(payload.showId)
    .map(() => followResponse(payload.showId))
    .do(() => toast(`Following "${payload.title}"`))
    .apiCatch(err => Observable.of(followError(payload.showId, err))));

const unfollowEpic$ = action$ => action$
  .ofType(UNFOLLOW_REQUEST)
  .switchMap(({ payload }) => unfollow$(payload.showId)
    .map(() => unfollowResponse(payload.showId))
    .do(() => toast(`No longer following "${payload.title}"`))
    .apiCatch(err => Observable.of(unfollowError(payload.showId, err))));

export const epics = combineEpics(
  editShowEpic$,
  deleteShowEpic$,
  deleteEpisodesEpic$,
  postponeEpisodesEpic$,
  markWatchedEpic$,
  unmarkWatchedEpic$,
  markWatchedBulkEpic$,
  unmarkWatchedBulkEpic$,
  followEpic$,
  unfollowEpic$,
);

//
// services
//
const createShow$ = show => apiService.post$('/shows', show);
const updateShow$ = show => apiService.put$(`/shows/${show.showId}`, show);
const deleteShow$ = showId => apiService.delete$(`/shows/${showId}`);

const deleteEpisodes$ = (showId, season, episode) => apiService.delete$(`/shows/${showId}/episodes`, { season, episode });

const postponeEpisodes$ = (showId, season, episode, newPremiereDate) => apiService.post$(`/shows/${showId}/episodes/postpone`, { season, episode, newPremiereDate });

const markWatched$ = (showId, episodeId) => apiService.post$(`/shows/${showId}/episodes/${episodeId}/mark-watched`);
const unmarkWatched$ = (showId, episodeId) => apiService.delete$(`/shows/${showId}/episodes/${episodeId}/mark-watched`);

const markWatchedBulk$ = (showId, season, episode) => apiService.post$(`/shows/${showId}/episodes/mark-watched`, { season, episode });
const unmarkWatchedBulk$ = (showId, season, episode) => apiService.delete$(`/shows/${showId}/episodes/mark-watched`, { season, episode });

const follow$ = (showId) => apiService.post$(`/shows/${showId}/follow`);
const unfollow$ = (showId) => apiService.delete$(`/shows/${showId}/follow`);

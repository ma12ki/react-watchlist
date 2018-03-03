import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import '../utils/rxjs.add.operator.apiCatch';
import { apiService } from '../utils';
import {
  FOLLOW_RESPONSE,
  UNFOLLOW_RESPONSE,
  MARK_WATCHED_RESPONSE,
  UNMARK_WATCHED_RESPONSE,
  MARK_WATCHED_BULK_RESPONSE,
  UNMARK_WATCHED_BULK_RESPONSE,
  DELETE_SHOW_RESPONSE,
  DELETE_EPISODES_RESPONSE,
  EDIT_SHOW_RESPONSE,
  POSTPONE_EPISODES_RESPONSE,
} from '../showOperations';
import { isCurrentLocationSel, payloadSel } from '../location';
import { moduleName } from './constants';

//
// actions
//
export const ROUTE_ALL_SHOWS = `${moduleName}/ROUTE_ALL_SHOWS`;
export const ROUTE_SHOW_DETAILS = `${moduleName}/ROUTE_SHOW_DETAILS`;

export const GET_SHOWS_REQUEST = `${moduleName}/GET_SHOWS_REQUEST`;
export const GET_SHOWS_RESPONSE = `${moduleName}/GET_SHOWS_RESPONSE`;
export const GET_SHOWS_ERROR = `${moduleName}/GET_SHOWS_ERROR`;
export const getShowsRequest = () => ({ type: GET_SHOWS_REQUEST });
export const getShowsResponse = shows => ({ type: GET_SHOWS_RESPONSE, payload: shows });
export const getShowsError = err => ({ type: GET_SHOWS_ERROR, payload: err });

export const SET_ALL_SHOWS_FILTERS = `${moduleName}/SET_ALL_SHOWS_FILTERS`;
export const setAllShowsFilters = (title, types, following) => ({ type: SET_ALL_SHOWS_FILTERS, payload: { title, types, following } });

export const SET_ALL_SHOWS_TABLE_NAV = `${moduleName}/SET_ALL_SHOWS_TABLE_NAV`;
export const setAllShowsTableNav = (pagination, sorter) => ({ type: SET_ALL_SHOWS_TABLE_NAV, payload: { pagination, sorter } });

export const GET_SHOW_REQUEST = `${moduleName}/GET_SHOW_REQUEST`;
export const GET_SHOW_RESPONSE = `${moduleName}/GET_SHOW_RESPONSE`;
export const GET_SHOW_ERROR = `${moduleName}/GET_SHOW_ERROR`;
export const getShowRequest = slug => ({ type: GET_SHOW_REQUEST, payload: slug });
export const getShowResponse = show => ({ type: GET_SHOW_RESPONSE, payload: show });
export const getShowError = err => ({ type: GET_SHOW_ERROR, payload: err });

//
// reducers
//

const allShows = (() => {
  const loading = (state = false, { type }) => {
    switch (type) {
      case GET_SHOWS_REQUEST: {
        return true;
      }
      case GET_SHOWS_RESPONSE:
      case GET_SHOWS_ERROR: {
        return false;
      }
      default: {
        return state;
      }
    }
  };

  const items = (state = [], { type, payload }) => {
    switch (type) {
      case GET_SHOWS_RESPONSE: {
        return payload;
      }
      case FOLLOW_RESPONSE:
      case UNFOLLOW_RESPONSE: {
        const following = type === FOLLOW_RESPONSE;
        return state.map(show => ({
          ...show,
          following: show.showId === payload.showId ? following : show.following,
        }));
      }
      case DELETE_SHOW_RESPONSE: {
        return state.filter(({ showId }) => showId !== payload.showId);
      }
      default: {
        return state;
      }
    }
  };

  const defaultFilters = {
    title: '',
    types: ['movie', 'show', 'anime', 'comic'],
    following: [true, false],
  };

  const filters = (state = defaultFilters, { type, payload }) => {
    switch (type) {
      case SET_ALL_SHOWS_FILTERS: {
        return payload;
      }
      default: {
        return state;
      }
    }
  };

  const tableNav = (state = {}, { type, payload }) => {
    switch (type) {
      case SET_ALL_SHOWS_TABLE_NAV: {
        return payload;
      }
      default: {
        return state;
      }
    }
  };

  return {
    loading,
    items,
    filters,
    tableNav,
  };
})();

const showLoading = (state = false, { type }) => {
  switch (type) {
    case GET_SHOW_REQUEST: {
      return true;
    }
    case GET_SHOW_RESPONSE:
    case GET_SHOW_ERROR: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const show = (state = {}, { type, payload }) => {
  switch (type) {
    case GET_SHOW_REQUEST: {
      return {};
    }
    case GET_SHOW_RESPONSE: {
      return payload;
    }
    case DELETE_SHOW_RESPONSE: {
      if (state.showId === payload.showId) {
        return {};
      }
      return state;
    }
    case DELETE_EPISODES_RESPONSE: {
      return {
        ...state,
        episodes: state.episodes.filter(e => !(e.season === payload.season && (e.episode === payload.episode || payload.episode == null))),
      };
    }
    case FOLLOW_RESPONSE:
    case UNFOLLOW_RESPONSE: {
      const following = type === FOLLOW_RESPONSE;
      return {
        ...state,
        following: state.showId === payload.showId ? following : state.following,
      };
    }
    case MARK_WATCHED_RESPONSE:
    case UNMARK_WATCHED_RESPONSE: {
      const watched = type === MARK_WATCHED_RESPONSE;
      if (state.showId === payload.showId) {
        return {
          ...state,
          episodes: state.episodes.map(e => {
            if (e.episodeId === payload.episodeId) {
              return {
                ...e,
                watched,
              };
            }
            return e;
          }),
        };
      }
      return state;
    }
    case MARK_WATCHED_BULK_RESPONSE:
    case UNMARK_WATCHED_BULK_RESPONSE: {
      const watched = type === MARK_WATCHED_BULK_RESPONSE;
      if (state.showId === payload.showId) {
        return {
          ...state,
          episodes: state.episodes.map(e => {
            if (e.season === payload.season && (e.episode <= payload.episode || payload.episode == null)) {
              return {
                ...e,
                watched,
              };
            }
            return e;
          }),
        };
      }
      return state;
    }
    default: {
      return state;
    }
  }
};

const reducers = combineReducers({
  allShows: combineReducers(allShows),
  showLoading,
  show,
});

export default reducers;

//
// selectors
//
const moduleSel = state => state[moduleName];

export const allShowsSel = state => moduleSel(state).allShows;

export const showLoadingSel = state => moduleSel(state).showLoading;
export const showSel = state => moduleSel(state).show;

//
// epics
//
const getShowsEpic$ = action$ => action$
  .ofType(GET_SHOWS_REQUEST)
  .switchMap(() => getShows$()
    .map(getShowsResponse)
    .apiCatch(err => Observable.of(getShowsError(err))));

const refreshShowsEpic$ = (action$, store) => action$
  .ofType(EDIT_SHOW_RESPONSE)
  .filter(() => isCurrentLocationSel(store.getState(), ROUTE_ALL_SHOWS))
  .mapTo(getShowsRequest());

const getShowFromRouteEpic$ = action$ => action$
  .ofType(ROUTE_SHOW_DETAILS)
  .map(({ payload }) => getShowRequest(payload.slug));

const getShowEpic$ = action$ => action$
  .ofType(GET_SHOW_REQUEST)
  .switchMap(({ payload }) => getShow$(payload)
    .map(getShowResponse)
    .apiCatch(err => Observable.of(getShowResponse(err))));

const refreshShowEpic$ = (action$, store) => action$
  .ofType(POSTPONE_EPISODES_RESPONSE, EDIT_SHOW_RESPONSE)
  .filter(() => isCurrentLocationSel(store.getState(), ROUTE_SHOW_DETAILS))
  .map(() => {
    const { slug } = payloadSel(store.getState());
    return getShowRequest(slug);
  });

export const epics = combineEpics(
  getShowsEpic$,
  refreshShowsEpic$,
  getShowFromRouteEpic$,
  getShowEpic$,
  refreshShowEpic$,
);

//
// services
//
const getShows$ = () => apiService.get$('/shows');

const getShow$ = slug => apiService.get$(`/shows/${slug}`);

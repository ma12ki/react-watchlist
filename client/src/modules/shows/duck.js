import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { range } from 'lodash';
import faker from 'faker';

// import { apiService } from '../../utils';
import { FOLLOW_RESPONSE, MARK_WATCHED_RESPONSE } from '../userShowActions';
import { showTypes } from '../shared';
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

export const GET_SHOW_REQUEST = `${moduleName}/GET_SHOW_REQUEST`;
export const GET_SHOW_RESPONSE = `${moduleName}/GET_SHOW_RESPONSE`;
export const GET_SHOW_ERROR = `${moduleName}/GET_SHOW_ERROR`;
export const getShowRequest = showId => ({ type: GET_SHOW_REQUEST, payload: showId });
export const getShowResponse = show => ({ type: GET_SHOW_RESPONSE, payload: show });
export const getShowError = err => ({ type: GET_SHOW_ERROR, payload: err });

//
// reducers
//
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
    case FOLLOW_RESPONSE: {
      return [...state].map(show => ({
        ...show,
        following: show.showId === payload.showId ? true : show.following,
      }));
    }
    default: {
      return state;
    }
  }
};

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
    case FOLLOW_RESPONSE: {
      return {
        ...state,
        following: state.showId === payload.showId ? true : state.following,
      };
    }
    case MARK_WATCHED_RESPONSE: {
      if (state.showId === payload.showId) {
        return {
          ...state,
          episodes: state.episodes.map(e => {
            if (e.episodeId === payload.episodeId) {
              return {
                ...e,
                watched: true,
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
  loading,
  items,
  showLoading,
  show,
});

export default reducers;

//
// selectors
//
const moduleSel = state => state[moduleName];

export const loadingSel = state => moduleSel(state).loading;
export const itemsSel = state => moduleSel(state).items;
export const showLoadingSel = state => moduleSel(state).showLoading;
export const showSel = state => moduleSel(state).show;

//
// epics
//
const getShowsEpic$ = action$ => action$
  .ofType(GET_SHOWS_REQUEST)
  .switchMap(() => getShows$()
    .map(getShowsResponse)
    .catch(err => Observable.of(getShowsError(err))));

const getShowFromRouteEpic$ = action$ => action$
  .ofType(ROUTE_SHOW_DETAILS)
  .map(({ payload }) => getShowRequest(payload.showId));

const getShowEpic$ = action$ => action$
  .ofType(GET_SHOW_REQUEST)
  .switchMap(() => getShow$()
    .map(getShowResponse)
    .catch(err => Observable.of(getShowResponse(err))));

export const epics = combineEpics(
  getShowsEpic$,
  getShowFromRouteEpic$,
  getShowEpic$,
);

//
// services
//
const getShows$ = () => Observable.of(getMockShows()).delay(1000);

const getShow$ = () => Observable.of({
  ...getMockShow(),
  episodes: getMockEpisodes(),
}).delay(1000);

const getMockShows = () => range(30)
  .map(getMockShow);

const getMockShow = () => ({
  showId: faker.random.uuid(),
  title: faker.name.jobTitle(),
  aka: faker.name.jobArea(),
  type: faker.random.arrayElement(showTypes),
  following: false,
  recurring: Math.random() > 0.5,
});

const getMockEpisodes = () => range(faker.random.number({ min: 0, max: 100 }))
  .map(() => ({
    episodeId: faker.random.uuid(),
    season: faker.random.number({ min: 1, max: 10 }),
    episode: faker.random.number({ min: 1, max: 100 }),
    premiereDate: faker.date.recent().toISOString(),
    watched: Math.random() > 0.7,
  }));

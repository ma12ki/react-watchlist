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
import { FOLLOW_RESPONSE } from '../episodeActions';
import { showTypes } from '../shared';
import { moduleName } from './constants';

//
// actions
//
export const ROUTE_ALL_SHOWS = `${moduleName}/ROUTE_ALL_SHOWS`;

export const GET_SHOWS_REQUEST = `${moduleName}/GET_SHOWS_REQUEST`;
export const GET_SHOWS_RESPONSE = `${moduleName}/GET_SHOWS_RESPONSE`;
export const GET_SHOWS_ERROR = `${moduleName}/GET_SHOWS_ERROR`;
export const getShowsRequest = () => ({ type: GET_SHOWS_REQUEST });
export const getShowsResponse = shows => ({ type: GET_SHOWS_RESPONSE, payload: shows });
export const getShowsError = err => ({ type: GET_SHOWS_ERROR, payload: err });

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

const reducers = combineReducers({
  loading,
  items,
});

export default reducers;

//
// selectors
//
const moduleSel = state => state[moduleName];

export const loadingSel = state => moduleSel(state).loading;
export const itemsSel = state => moduleSel(state).items;

//
// epics
//
const getShowsEpic$ = action$ => action$
  .ofType(GET_SHOWS_REQUEST)
  .switchMap(() => getShows$()
    .map(getShowsResponse)
    .catch(err => Observable.of(err)));

export const epics = combineEpics(
  getShowsEpic$,
);

//
// services
//
const getShows$ = () => Observable.of(getMockShows()).delay(1000);

const getMockShows = () => range(30)
  .map(() => ({
    showId: faker.random.uuid(),
    title: faker.name.jobTitle(),
    type: faker.random.arrayElement(showTypes),
    following: false,
  }));

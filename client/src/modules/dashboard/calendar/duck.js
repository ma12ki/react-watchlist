import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import { range } from 'lodash';
import faker from 'faker';
import moment from 'moment';

// import { apiService } from '../../utils';
import { MARK_WATCHED_RESPONSE } from '../../episodeActions';
import { isCurrentLocationSel } from '../../location';
import { showTypes } from '../../shared';
import { dashboardModuleName, ROUTE_DASHBOARD } from '../common';
import { moduleName } from './constants';

//
// actions
//
export const EPISODES_REQUEST = `${moduleName}/EPISODES_REQUEST`;
export const EPISODES_RESPONSE = `${moduleName}/EPISODES_RESPONSE`;
export const EPISODES_ERROR = `${moduleName}/EPISODES_ERROR`;
export const episodesRequest = () => ({ type: EPISODES_REQUEST });
export const episodesResponse = episodes => ({ type: EPISODES_RESPONSE, payload: episodes });
export const episodesError = err => ({ type: EPISODES_ERROR, payload: err });

export const SET_CALENDAR_DATES = `${moduleName}/SET_CALENDAR_DATES`;
export const setCalendarDates = (dateFrom, dateTo) => ({ type: SET_CALENDAR_DATES, payload: { dateFrom, dateTo } });

//
// reducers
//
const loading = (state = false, { type }) => {
  switch (type) {
    case EPISODES_REQUEST: {
      return true;
    }
    case EPISODES_RESPONSE:
    case EPISODES_ERROR: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const episodes = (state = [], { type, payload }) => {
  switch (type) {
    case EPISODES_RESPONSE: {
      return payload;
    }
    case MARK_WATCHED_RESPONSE: {
      return [...state].map(e => ({
        ...e,
        watched: e.episodeId === payload.episodeId ? true : e.watched,
      }));
    }
    default: {
      return state;
    }
  }
};

const dates = (state = {
  from: moment().startOf('month').subtract(14, 'days').startOf('day').toISOString(),
  to: moment().endOf('month').add(14, 'days').endOf('day').toISOString(),
}, { type, payload }) => {
  switch (type) {
    case SET_CALENDAR_DATES: {
      return {
        from: moment(payload.dateFrom).toISOString(),
        to: moment(payload.dateTo).toISOString(),
      };
    }
    default: {
      return state;
    }
  }
};

const reducers = combineReducers({
  loading,
  episodes,
  dates,
});

export default reducers;

//
// selectors
//
const parentModuleSel = state => state[dashboardModuleName];
const moduleSel = state => parentModuleSel(state)[moduleName];

export const loadingSel = state => moduleSel(state).loading;
export const episodesSel = state => moduleSel(state).episodes;
export const datesSel = state => moduleSel(state).dates;

//
// epics
//
const getEpisodesEpic$ = (action$, store) => action$
  .ofType(EPISODES_REQUEST)
  .map(() => datesSel(store.getState()))
  .switchMap(({ from, to }) => getEpisodes$(from, to)
    .map(episodesResponse)
    .catch(err => Observable.of(err)));

const refreshEpisodesEpic$ = (action$, store) => action$
  .ofType(SET_CALENDAR_DATES)
  .filter(() => isCurrentLocationSel(store.getState(), ROUTE_DASHBOARD))
  .mapTo(episodesRequest());

export const epics = combineEpics(
  getEpisodesEpic$,
  refreshEpisodesEpic$,
);

//
// services
//
const getEpisodes$ = (dateFrom, dateTo) => Observable.of(getMockEpisodes(dateFrom, dateTo)).delay(1000);

const getMockEpisodes = (dateFrom, dateTo) => {
  return range(10)
    .map(() => {
      return {
        showId: faker.random.uuid(),
        episodeId: faker.random.uuid(),
        title: faker.name.jobTitle(),
        premiereDate: faker.date.between(moment(dateFrom), moment(dateTo)),
        season: faker.random.number({ min: 1, max: 10 }),
        episode: faker.random.number({ min: 1, max: 100 }),
        type: faker.random.arrayElement(showTypes),
        watched: false,
      };
    });
};

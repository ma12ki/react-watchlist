import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import moment from 'moment';

import '../../utils/rxjs.add.operator.apiCatch';
import { apiService } from '../../utils';
import {
  MARK_WATCHED_RESPONSE,
  MARK_WATCHED_BULK_RESPONSE,
  POSTPONE_EPISODES_RESPONSE,
} from '../../showOperations';
import { isCurrentLocationSel } from '../../location';
import { dashboardModuleName, ROUTE_DASHBOARD, effectiveViewSel } from '../common';
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

export const SET_MAX_DATE = `${moduleName}/SET_MAX_DATE`;
export const setMaxDate = date => ({ type: SET_MAX_DATE, payload: date });

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
      return state.filter(e => e.episodeId !== payload.episodeId);
    }
    case MARK_WATCHED_BULK_RESPONSE: {
      return state.filter(e => {
        if (e.showId === payload.showId) {
          return !(e.season === payload.season && (e.episode <= payload.episode || payload.episode == null));
        }
        return true;
      });
    }
    default: {
      return state;
    }
  }
};

const maxDate = (state = moment().startOf('day').add(1, 'month').toISOString(), { type, payload }) => {
  switch (type) {
    case SET_MAX_DATE: {
      return payload;
    }
    default: {
      return state;
    }
  }
};

const reducers = combineReducers({
  loading,
  episodes,
  maxDate,
});

export default reducers;

//
// selectors
//
const parentModuleSel = state => state[dashboardModuleName];
const moduleSel = state => parentModuleSel(state)[moduleName];

export const loadingSel = state => moduleSel(state).loading;
export const episodesSel = state => moduleSel(state).episodes;
export const maxDateSel = state => moduleSel(state).maxDate;

//
// epics
//
const getEpisodesEpic$ = (action$, store) => action$
  .ofType(EPISODES_REQUEST)
  .map(() => maxDateSel(store.getState()))
  .switchMap(maxDate => getEpisodes$(maxDate)
    .map(episodesResponse)
    .apiCatch(err => Observable.of(episodesError(err))));

const refreshEpisodesEpic$ = (action$, store) => action$
  .ofType(SET_MAX_DATE, POSTPONE_EPISODES_RESPONSE)
  .filter(() => {
    const state = store.getState();
    return isCurrentLocationSel(state, ROUTE_DASHBOARD) && effectiveViewSel(state) === 'timeline';
  })
  .mapTo(episodesRequest());

export const epics = combineEpics(
  getEpisodesEpic$,
  refreshEpisodesEpic$,
);

//
// services
//
const getEpisodes$ = maxDate => apiService.get$(`/shows/episodes?dateTo=${maxDate}&noWatched=true`);

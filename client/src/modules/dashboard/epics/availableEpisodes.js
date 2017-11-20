import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import { combineEpics } from 'redux-observable';

import {
  ROUTE_HOME,
  LOAD_AVAILABLE_EPISODES_START,
} from '../actionTypes';
import {
  loadAvailableEpisodesSuccess,
  loadAvailableEpisodesError,
} from '../actions';
// import { getLoginReturnTo } from './selectors';
import { getAvailableEpisodes$ } from '../service/availableEpisodes';

const loadAvailableEpisodes$ = (action$) =>
  action$
    .ofType(ROUTE_HOME, LOAD_AVAILABLE_EPISODES_START)
    // TODO: remove this
    .delay(1000)
    .switchMap(() => getAvailableEpisodes$()
      .map((eps) => loadAvailableEpisodesSuccess(eps))
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
        return Observable.of(loadAvailableEpisodesError(err));
      }));

export default combineEpics(
  loadAvailableEpisodes$,
);

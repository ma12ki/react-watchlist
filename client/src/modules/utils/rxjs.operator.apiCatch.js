import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

/**
 * This is meant to be used instead of catch within epics that make api calls.
 * Handles error 401 returned by api and maps it to logout action.
 *
 * @example intended usage
 *
 * apiCall$()
 *  .map(responseHandler)
 *  .apiCatch(errorHandler)
 *
 * @param {function} handler handler for other errors
 */
export default function (handler) {
  return this
    .catch(err => {
      // eslint-disable-next-line no-console
      console.error(err);
      if (err.status && err.status === 401) {
        return Observable.of({ type: 'user/LOGOUT' });
      }
      return handler.call(this, err);
    });
}

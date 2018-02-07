import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import faker from 'faker';

// import { apiService } from '../../utils';
import { moduleName, roles, userStorageKey } from './constants';

//
// actions
//
export const ROUTE_LOGIN = `${moduleName}/ROUTE_LOGIN`;

export const LOGIN_REQUEST = `${moduleName}/LOGIN_REQUEST`;
export const LOGIN_RESPONSE = `${moduleName}/LOGIN_RESPONSE`;
export const LOGIN_ERROR = `${moduleName}/LOGIN_ERROR`;
export const loginRequest = email => ({ type: LOGIN_REQUEST, payload: email });
export const loginResponse = user => ({ type: LOGIN_RESPONSE, payload: user });
export const loginError = err => ({ type: LOGIN_ERROR, payload: err });

export const LOGOUT = `${moduleName}/LOGOUT`;
export const logout = () => ({ type: LOGOUT });

//
// reducers
//
const user = (state = null, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
    case LOGOUT: {
      return null;
    }
    case LOGIN_RESPONSE: {
      return payload;
    }
    default: {
      return state;
    }
  }
};

const loginLoading = (state = false, { type }) => {
  switch (type) {
    case LOGIN_REQUEST: {
      return true;
    }
    case LOGIN_RESPONSE:
    case LOGIN_ERROR: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const reducers = combineReducers({
  user,
  loginLoading,
});

export default reducers;

//
// selectors
//
const moduleSel = state => state[moduleName];

export const userSel = state => moduleSel(state).user || {};
export const isLoggedInSel = state => Boolean(moduleSel(state).user);

export const userLoadingSel = state => moduleSel(state).loginLoading;

//
// epics
//
const loginEpic$ = action$ => action$
  .ofType(LOGIN_REQUEST)
  .switchMap(() => login$()
    .do(storeUser)
    .map(loginResponse)
    .catch(err => Observable.of(loginError(err))));

const logoutEpic$ = action$ =>
  action$.ofType(LOGOUT)
    .do(removeUser)
    .mapTo(({ type: ROUTE_LOGIN }));

export const epics = combineEpics(
  loginEpic$,
  logoutEpic$,
);

//
// services
//
const login$ = () => Observable.of(getMockUser()).delay(1000);

const getMockUser = () => ({
  userId: faker.random.uuid(),
  email: faker.internet.email(),
  role: faker.random.arrayElement(roles),
});

export const storeUser = user => localStorage.setItem(userStorageKey, user);
export const retrieveUser = () => localStorage.getItem(userStorageKey);
export const removeUser = () => localStorage.removeItem(userStorageKey);

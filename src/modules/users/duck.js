import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { toast } from 'react-toastify';

import '../utils/rxjs.add.operator.apiCatch';
import { apiService, resetOnLogoutReducer } from '../utils';
import { moduleName } from './constants';

//
// actions
//
export const ROUTE_USERS = `${moduleName}/ROUTE_USERS`;

export const GET_USERS_REQUEST = `${moduleName}/GET_USERS_REQUEST`;
export const GET_USERS_RESPONSE = `${moduleName}/GET_USERS_RESPONSE`;
export const GET_USERS_ERROR = `${moduleName}/GET_USERS_ERROR`;
export const getUsersRequest = () => ({ type: GET_USERS_REQUEST });
export const getUsersResponse = users => ({ type: GET_USERS_RESPONSE, payload: users });
export const getUsersError = err => ({ type: GET_USERS_ERROR, payload: err });

export const EDIT_USER_REQUEST = `${moduleName}/EDIT_USER_REQUEST`;
export const EDIT_USER_RESPONSE = `${moduleName}/EDIT_USER_RESPONSE`;
export const EDIT_USER_ERROR = `${moduleName}/EDIT_USER_ERROR`;
export const editUserRequest = user => ({ type: EDIT_USER_REQUEST, payload: user });
export const editUserResponse = user => ({ type: EDIT_USER_RESPONSE, payload: user });
export const editUserError = (email, err) => ({ type: EDIT_USER_ERROR, payload: { email, err } });

export const DELETE_USER_REQUEST = `${moduleName}/DELETE_USER_REQUEST`;
export const DELETE_USER_RESPONSE = `${moduleName}/DELETE_USER_RESPONSE`;
export const DELETE_USER_ERROR = `${moduleName}/DELETE_USER_ERROR`;
export const deleteUserRequest = (userId, email) => ({ type: DELETE_USER_REQUEST, payload: { userId, email } });
export const deleteUserResponse = (userId, email) => ({ type: DELETE_USER_RESPONSE, payload: { userId, email } });
export const deleteUserError = (userId, email, err) => ({ type: DELETE_USER_ERROR, payload: { userId, email, err } });

//
// reducers
//
const usersLoading = (state = false, { type }) => {
  switch (type) {
    case GET_USERS_REQUEST: {
      return true;
    }
    case GET_USERS_RESPONSE:
    case GET_USERS_ERROR: {
      return false;
    }
    default: {
      return state;
    }
  }
};

const users = (state = [], { type, payload }) => {
  switch (type) {
    case GET_USERS_RESPONSE: {
      return payload;
    }
    case EDIT_USER_RESPONSE: {
      const existingUser = state.find(({ userId }) => userId === payload.userId);

      if (existingUser) {
        return state.map(user => {
          if (user.userId === payload.userId) {
            return payload;
          }
          return user;
        });
      } else {
        return [
          ...state,
          payload,
        ];
      }

    }
    case DELETE_USER_RESPONSE: {
      return state.filter(({ userId }) => userId !== payload.userId );
    }
    default: {
      return state;
    }
  }
};

const userLoading = (state = {}, { type, payload }) => {
  switch (type) {
    case EDIT_USER_REQUEST:
    case DELETE_USER_REQUEST: {
      return {
        ...state,
        [payload.email]: true,
      };
    }
    case EDIT_USER_RESPONSE:
    case EDIT_USER_ERROR:
    case DELETE_USER_RESPONSE:
    case DELETE_USER_ERROR: {
      return {
        ...state,
        [payload.email]: false,
      };
    }
    default: {
      return state;
    }
  }
};

const reducers = combineReducers({
  usersLoading,
  users,
  userLoading,
});

export default resetOnLogoutReducer(reducers);

//
// selectors
//
const moduleSel = state => state[moduleName];

export const usersLoadingSel = state => moduleSel(state).usersLoading;
export const usersSel = state => moduleSel(state).users;

export const userLoadingAllSel = state => moduleSel(state).userLoading;
export const userLoadingSel = (state, email) => userLoadingAllSel(state)[email] || false;

//
// epics
//
const getUsersEpic$ = action$ => action$
  .ofType(GET_USERS_REQUEST)
  .switchMap(() => getUsers$()
    .map(getUsersResponse)
    .apiCatch(err => Observable.of(getUsersError(err))));

const editUserEpic$ = action$ => action$
  .ofType(EDIT_USER_REQUEST)
  .switchMap(({ payload }) => (payload.userId == null ? createUser$(payload) : updateUser$(payload))
    .map(editUserResponse)
    .do(() => payload.userId == null ? toast('User added') : toast('User updated'))
    .apiCatch(err => Observable.of(editUserError(payload.email, err))));

const deleteUserEpic$ = action$ => action$
  .ofType(DELETE_USER_REQUEST)
  .switchMap(({ payload }) => deleteUser$(payload.userId)
    .map(() => deleteUserResponse(payload.userId))
    .do(() => toast('User deleted'))
    .apiCatch(err => Observable.of(deleteUserError(payload.userId, payload.email, err))));

export const epics = combineEpics(
  getUsersEpic$,
  editUserEpic$,
  deleteUserEpic$,
);

//
// services
//
const getUsers$ = () => apiService.get$('/users');
const createUser$ = user => apiService.post$('/users', user);
const updateUser$ = user => apiService.put$(`/users/${user.userId}`, user);
const deleteUser$ = userId => apiService.delete$(`/users/${userId}`);

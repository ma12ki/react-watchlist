import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/switchMap';

import { API_URL } from '../config';
import http from './http';

const getBaseOptions = () => {
  const token = localStorage.getItem('USER') || '';

  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  };
};

const apiCalls = {
  get$: (endpoint, options) => apiCall$(http.get, endpoint, options),
  post$: (endpoint, body, options) => apiCall$(http.post, endpoint, body, options),
  put$: (endpoint, body, options) => apiCall$(http.put, endpoint, body, options),
  patch$: (endpoint, body, options) => apiCall$(http.patch, endpoint, body, options),
  delete$: (endpoint, body, options) => apiCall$(http.delete, endpoint, body, options),

  get: (endpoint, options) => apiCall(http.get, endpoint, options),
  post: (endpoint, body, options) => apiCall(http.post, endpoint, body, options),
  put: (endpoint, body, options) => apiCall(http.put, endpoint, body, options),
  patch: (endpoint, body, options) => apiCall(http.patch, endpoint, body, options),
  delete: (endpoint, body, options) => apiCall(http.delete, endpoint, body, options),
};

const apiCall$ = (method, endpoint, body, options) =>
  Observable.fromPromise(method(`${API_URL}${endpoint}`, mergeOptions(body, options)))
    .switchMap(response => response.json());

const apiCall = async (method, endpoint, body, options) => {
  const response = await method(`${API_URL}${endpoint}`, mergeOptions(body, options));

  return response.json();
};

const mergeOptions = (body, options) => ({
  ...getBaseOptions(),
  body: JSON.stringify(body),
  ...options,
});

export default apiCalls;

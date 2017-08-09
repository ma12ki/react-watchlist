import { Observable } from 'rxjs/Observable';
import _ from 'lodash/fp';

import { apiUrl } from '../config';

const fromPromise$ = Observable.fromPromise;

const apiAxios = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
  responseType: 'json',
});

const get = (path) => {
  return apiAxios.get({
    url: path,
  });
};

const post = (path, data) => {
  return apiAxios.post({
    url: path,
    data,
  });
};

const put = (path, data) => {
  return apiAxios.put({
    url: path,
    data,
  });
};

const remove = (path) => {
  return apiAxios.delete({
    url: path,
  });
};

const get$ = _.compose(fromPromise$, get);
const post$ = _.compose(fromPromise$, post);
const put$ = _.compose(fromPromise$, put);
const delete$ = _.compose(fromPromise$, remove);

const http = {
  get$,
  post$,
  put$,
  delete$,
};

export { http };

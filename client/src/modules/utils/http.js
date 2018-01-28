import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { toast } from 'react-toastify';

const http = {
  get$: (url, options) => request$('GET', url, options),
  post$: (url, options) => request$('POST', url, options),
  put$: (url, options) => request$('PUT', url, options),
  patch$: (url, options) => request$('PATCH', url, options),
  delete$: (url, options) => request$('DELETE', url, options),

  get: (url, options) => request('GET', url, options),
  post: (url, options) => request('POST', url, options),
  put: (url, options) => request('PUT', url, options),
  patch: (url, options) => request('PATCH', url, options),
  delete: (url, options) => request('DELETE', url, options),
};

const request$ = (method, url, options) => Observable.fromPromise(request(method, url, options));

const request = async (method, url, options) => {
  const response = await fetch(url, {
    method,
    ...options,
  });
  if (response.ok) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  await showErrorNotification(response);
  throw error;
};

const showErrorNotification = async response => {
  let message;
  try {
    const json = await response.json();
    message = json.message || response.statusText;
  } catch (e) {
    message = response.statusText;
  }

  toast.error(message);
};

export default http;

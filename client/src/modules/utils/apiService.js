import { API_URL } from '../config';
import http from './http';

const baseUrl = API_URL;
const baseOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const apiCalls = {
  get: (endpoint, options) => apiCall(http.get, endpoint, options),
  post: (endpoint, options) => apiCall(http.post, endpoint, options),
  put: (endpoint, options) => apiCall(http.put, endpoint, options),
  patch: (endpoint, options) => apiCall(http.patch, endpoint, options),
  delete: (endpoint, options) => apiCall(http.delete, endpoint, options),
};

const apiCall = async (method, endpoint, options) => {
  const response = await method(baseUrl + endpoint, {
    ...baseOptions,
    ...options
  });

  return response.json();
};

export default apiCalls;

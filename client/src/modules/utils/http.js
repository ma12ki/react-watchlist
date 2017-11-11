const http = {
  get: (url, options) => request('GET', url, options),
  post: (url, options) => request('POST', url, options),
  put: (url, options) => request('PUT', url, options),
  patch: (url, options) => request('PATCH', url, options),
  delete: (url, options) => request('DELETE', url, options),
};

const request = async (method, url, options) => {
  const response = await fetch(url, {
    method,
    ...options,
  });

  if (response.ok) {
    return response;
  }

  const error = new Error(error.statusText);
  error.response = response;
  throw error;
};

export default http;

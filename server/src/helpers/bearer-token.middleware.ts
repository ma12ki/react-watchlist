const bearerKey = 'Bearer';

export const bearerToken = (req, _res, next) => {
  let token = null;

  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === bearerKey) {
      token = parts[1];
    }
  }

  if (token) {
    req.token = token;
  }
  next();
};

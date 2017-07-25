import { decode } from 'jsonwebtoken';

export const extractUser = (req, _res, next) => {
  const { token } = req;

  if (token) {
    req.user = decode(token);
  }
  next();
};

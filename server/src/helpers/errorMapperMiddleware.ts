import * as express from 'express';

import { HttpError } from './HttpError';

export default (err: HttpError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { statusCode, message } = err;
  res.status(statusCode || 500).send({ message });
};

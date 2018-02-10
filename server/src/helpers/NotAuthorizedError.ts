import { HttpError } from './HttpError';

export class NotAuthorizedError extends HttpError {
  statusCode = 401;
}

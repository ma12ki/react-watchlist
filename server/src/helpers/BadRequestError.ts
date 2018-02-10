import { HttpError } from './HttpError';

export class BadRequestError extends HttpError {
  statusCode = 400;
}

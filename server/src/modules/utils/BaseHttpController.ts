import * as express from 'express';
import { BaseHttpController as InversifyBaseHttpController } from 'inversify-express-utils';

import { IUser } from '../../entities';
import Principal from '../auth/Principal';

export class BaseHttpController extends InversifyBaseHttpController {
  get user(): Principal {
    return this.httpContext.user;
  }
  get request(): express.Request {
    return this.httpContext.request;
  }
  get response(): express.Response {
    return this.httpContext.response;
  }
}

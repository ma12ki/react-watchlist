import * as express from 'express';
import { interfaces } from 'inversify-express-utils';

import { NotAuthorizedError } from '../../helpers';
import { IUser } from '../../entities';

class Principal implements interfaces.Principal {
  public details: IUser;
  public constructor(details: IUser) {
    this.details = details;
  }
  public async isAuthenticated(): Promise<boolean> {
    return Boolean(this.details);
  }
  public async isResourceOwner(resourceId: any): Promise<boolean> {
    throw new Error('not implemented');
  }
  public async isInRole(roles: string): Promise<boolean> {
    const inRole = this.details && roles.includes(this.details.role);
    if (!inRole) {
      throw new NotAuthorizedError();
    }
    return true;
  }
}

export default Principal;

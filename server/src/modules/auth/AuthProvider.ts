import * as express from 'express';
import { injectable, inject } from 'inversify';
import { interfaces } from 'inversify-express-utils';

import { authTokens } from './auth.tokens';
import { IAuthService } from './AuthService';
import Principal from './Principal';

@injectable()
class AuthProvider implements interfaces.AuthProvider {

  @inject(authTokens.AuthService) private readonly authService: IAuthService;

  public async getUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): Promise<interfaces.Principal> {
    const token = (req.headers['authorization'] as string);
    const user = token ? this.authService.decodeUser(token) : null;
    const principal = new Principal(user);
    return principal;
  }
}

export default AuthProvider;

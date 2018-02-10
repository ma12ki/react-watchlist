import * as express from 'express';
import { injectable, inject } from 'inversify';
import { interfaces } from 'inversify-express-utils';

import { usersTokens, IUsersService } from '../users';
import { authTokens } from './auth.tokens';
import { IAuthService } from './AuthService';
import Principal from './Principal';

@injectable()
class AuthProvider implements interfaces.AuthProvider {

  @inject(usersTokens.UsersService) private readonly usersService: IUsersService;
  @inject(authTokens.AuthService) private readonly authService: IAuthService;

  public async getUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): Promise<interfaces.Principal> {
    const token = (req.headers['authorization'] as string);
    const { userId = null } = token ? this.authService.decodeUser(token) : {};
    let user = null
    if (userId) {
      user = await this.usersService.getUser(userId);
    }
    const principal = new Principal(user);
    return principal;
  }
}

export default AuthProvider;

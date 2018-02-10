import * as express from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost, requestBody } from 'inversify-express-utils';

import { NotAuthorizedError } from '../../helpers';
import { IUser } from '../../entities';
import { BaseHttpController } from '../utils';
import { authTokens, IAuthService } from '../auth';
import { usersTokens } from './users.tokens';
import { IUsersService } from './users.service';

@controller('/users')
export class UsersController extends BaseHttpController {
  @inject(authTokens.AuthService) private readonly authService: IAuthService;
  @inject(usersTokens.UsersService) private readonly usersService: IUsersService;

  @httpPost('/login')
  public async login(@requestBody('googleAccessToken') token: string) {
    const { email } = await this.authService.verifyGoogleAccessToken(token);
    const user = await this.usersService.getUserByEmail(email);
    if (!user) {
      throw new NotAuthorizedError('You are not whitelisted');
    }
    const userToken = this.authService.encodeUser(user);
    return { token: userToken };
  }

  @httpGet('/')
  public async getUsers(): Promise<IUser[]> {
    await this.user.isInRole('root');
    return this.usersService.getUsers();
  }
}

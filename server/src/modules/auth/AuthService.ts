import { injectable } from 'inversify';
import * as jwt from 'jwt-simple';
import axios from 'axios';

import { jwtSecret } from '../../config';
import { IUser, IGoogleUser } from '../../entities';

export interface IAuthService {
  verifyGoogleAccessToken: (token: string) => Promise<IGoogleUser>;
  decodeUser: (token: string) => IUser;
  encodeUser: (user: IUser) => string;
}

@injectable()
export class AuthService implements IAuthService {
  public async verifyGoogleAccessToken(token: string): Promise<IGoogleUser> {
    const { data } = await axios.post<IGoogleUser>(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`);
    return data;
  }

  public decodeUser(token: string): IUser {
    return jwt.decode(token, jwtSecret);
  }

  public encodeUser(user: IUser): string {
    return jwt.encode(user, jwtSecret);
  }
}

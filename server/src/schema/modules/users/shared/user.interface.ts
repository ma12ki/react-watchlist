import { IBaseUser } from '../../../../../../common/users';

export * from '../../../../../../common/users';

export interface IBaseUserWithPasswordHash extends IBaseUser {
  passwordHash: string;
}

export interface IBaseUserWithPassword extends IBaseUser {
  password: string;
}

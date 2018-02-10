import { inject, injectable } from 'inversify';
import { getConnection, Repository } from 'typeorm';

import { IUser, User } from '../../entities';

export interface IUsersService {
  getUser: (userId: number) => Promise<IUser>;
  getUserByEmail: (email: string) => Promise<IUser>;
  getUsers: () => Promise<IUser[]>;
  createUser: (user: IUser) => Promise<IUser>;
  updateUser: (user: IUser) => Promise<void>;
  deleteUser: (userId: number) => Promise<void>;
}

@injectable()
export class UsersService implements IUsersService {
  public async getUser(userId: number): Promise<IUser> {
    return this.getRepository().findOneById(userId);
  }

  public async getUserByEmail(email: string): Promise<IUser> {
    return this.getRepository().findOne({ email });
  }

  public async getUsers(): Promise<IUser[]> {
    return this.getRepository().find();
  }

  public async createUser(user: IUser): Promise<IUser> {
    return this.getRepository().save(user);
  }

  public async updateUser(user: IUser): Promise<void> {
    await this.getRepository().save(user);
  }

  public async deleteUser(userId: number): Promise<void> {
    return this.getRepository().deleteById(userId);
  }

  private getRepository(): Repository<User> {
    const connection = getConnection();
    return connection.getRepository(User);
  }
}

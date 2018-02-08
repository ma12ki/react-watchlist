import { inject, injectable } from 'inversify';
import { getConnection, Repository } from 'typeorm';

import { IUser, User } from '../../entities';

export interface IUsersService {
  getUser: (userId: number) => Promise<IUser>;
  createUser: (user: IUser) => Promise<IUser>;
  updateUser: (user: IUser) => Promise<void>;
  deleteUser: (userId: number) => Promise<void>;
}

@injectable()
export class UsersService implements IUsersService {
  public async getUser(userId: number): Promise<IUser> {
    const repo = this.getRepository();
    return repo.findOneById(userId);
  }

  public async createUser(user: IUser): Promise<IUser> {
    const repo = this.getRepository();
    return repo.save(user);
  }

  public async updateUser(user: IUser): Promise<void> {
    const repo = this.getRepository();
    await repo.save(user);
  }

  public async deleteUser(userId: number): Promise<void> {
    const repo = this.getRepository();
    return repo.deleteById(userId);
  }

  private getRepository(): Repository<User> {
    const connection = getConnection();
    return connection.getRepository(User);
  }
}

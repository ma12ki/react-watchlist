import { inject, injectable } from 'inversify';
import { Repository } from 'typeorm';

import { dbTokens, IDb } from '../../db';
import { IShow, Show } from '../../entities/show';

export interface IShowsService {
  getShows: () => Promise<IShow[]>;
}

@injectable()
export class ShowsService implements IShowsService {
  constructor(
    @inject(dbTokens.db) private db: IDb,
  ) {}

  public async getShows(): Promise<IShow[]> {
    const repo = await this.getRepository();
    return repo.find();
  }

  private async getRepository(): Promise<Repository<Show>> {
    const connection = await this.db.getConnection();
    return connection.getRepository(Show);
  }
}

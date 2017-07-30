import { inject, injectable } from 'inversify';
import { Repository } from 'typeorm';

import { dbTokens, IDb } from '../../db';
import { ISeason, Season } from '../../entities/season';

export interface ISeasonsService {
  getSeasons: () => Promise<ISeason[]>;
}

@injectable()
export class SeasonsService implements ISeasonsService {
  constructor(
    @inject(dbTokens.db) private db: IDb,
  ) {}

  public async getSeasons(): Promise<ISeason[]> {
    const repo = await this.getRepository();
    return repo.find();
  }

  private async getRepository(): Promise<Repository<Season>> {
    const connection = await this.db.getConnection();
    return connection.getRepository(Season);
  }
}

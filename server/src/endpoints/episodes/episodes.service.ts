import { inject, injectable } from 'inversify';
import { Repository } from 'typeorm';

import { dbTokens, IDb } from '../../db';
import { IEpisode, Episode } from '../../entities/episode';

export interface IEpisodesService {
  getEpisodes: () => Promise<IEpisode[]>;
}

@injectable()
export class EpisodesService implements IEpisodesService {
  constructor(
    @inject(dbTokens.db) private db: IDb,
  ) {}

  public async getEpisodes(): Promise<IEpisode[]> {
    const repo = await this.getRepository();
    return repo.find();
  }

  private async getRepository(): Promise<Repository<Episode>> {
    const connection = await this.db.getConnection();
    return connection.getRepository(Episode);
  }
}

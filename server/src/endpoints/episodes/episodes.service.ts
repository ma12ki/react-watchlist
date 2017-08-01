import { inject, injectable } from 'inversify';
import { QueryBuilder, Repository } from 'typeorm';

import { dbTokens, IDb } from '../../db';
import { IEpisode, Episode } from '../../entities/episode';
import { IShow } from '../../entities/show';

export interface IEpisodesService {
  getEpisodes: () => Promise<IEpisode[]>;
  getAvailable: () => Promise<IEpisodeWithShow[]>;
  getUpcoming: () => Promise<IEpisodeWithShow[]>;
}

export interface IEpisodeWithShow extends IEpisode {
  show: IShow;
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

  public async getAvailable(): Promise<IEpisodeWithShow[]> {
    const query = await this.getEpisodeWithShowQuery();

    const available = await query
      .where('episode.premiereDate<=:now')
      .setParameter('now', new Date())
      .getMany();

    return available.map((episode: any) => {
      episode.show = episode.season.show;
      delete episode.season.show;
      return episode;
    });
  }

  public async getUpcoming(): Promise<IEpisodeWithShow[]> {
    const query = await this.getEpisodeWithShowQuery();

    const upcoming = await query
      .where('episode.premiereDate>:now')
      .setParameter('now', new Date())
      .getMany();

    return upcoming.map((episode: any) => {
      episode.show = episode.season.show;
      delete episode.season.show;
      return episode;
    });
  }

  private async getEpisodeWithShowQuery(): Promise<QueryBuilder<Episode>> {
    const repo = await this.getRepository();

    return repo.createQueryBuilder('episode')
      .innerJoinAndSelect('episode.season', 'season')
      .innerJoinAndSelect('season.show', 'show');
  }

  private async getRepository(): Promise<Repository<Episode>> {
    const connection = await this.db.getConnection();
    return connection.getRepository(Episode);
  }
}

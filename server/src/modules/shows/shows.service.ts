import { inject, injectable } from 'inversify';
import { getConnection, Repository } from 'typeorm';
import * as slug from 'slug';
import * as uniqueSlug from 'unique-slug';

import { IShow, IShowForUser, IShowDetails, IShowDetailsForUser, IUser, Show, Episode, User } from '../../entities';

export interface IShowsService {
  getShows: (userId: number) => Promise<IShowForUser[]>;
  getShowBySlug: (slug: string, userId: number) => Promise<IShowDetailsForUser>;
  createShow: (show: IShowDetails) => Promise<IShowDetails>;
  // updateShow: (show: IShowDetails) => Promise<IShowDetails>;
  // deleteShow: (showId: number) => Promise<void>;
  followShow: (showId: number, user: IUser) => Promise<void>;
  unfollowShow: (showId: number, user: IUser) => Promise<void>;
  markEpisodeWatched: (episodeId: number, user: IUser) => Promise<void>;
  unmarkEpisodeWatched: (episodeId: number, user: IUser) => Promise<void>;
  bulkMarkEpisodeWatched: (showId: number, season: number, episode: number, user: IUser) => Promise<void>;
  bulkUnmarkEpisodeWatched: (showId: number, season: number, episode: number, user: IUser) => Promise<void>;
}

@injectable()
export class ShowsService implements IShowsService {
  // public async getShows(): Promise<IShowForUser[]> {
  //   return this.getRepository().findOneById(userId);
  // }

  public async getShowBySlug(slug: string, userId: number): Promise<IShowDetailsForUser> {
    const show: any = await this.getShowRepository()
      .createQueryBuilder('show')
      .leftJoinAndSelect('show.episodes', 'episodes')
      .leftJoinAndMapOne('show.following', 'show.users', 'user', 'user.userId = :userId', { userId })
      .leftJoinAndMapOne('episodes.watched', 'episodes.users', 'user2', 'user2.userId = :userId', { userId })
      .where({ slug })
      .getOne();

    show.recurring = Boolean(show.recurring);
    show.following = Boolean(show.following);
    show.episodes = show.episodes.map(e => ({
      ...e,
      watched: Boolean(e.watched),
    }));

    return show;
  }

  public async getShows(userId: number): Promise<IShowForUser[]> {
    const shows: any = await this.getShowRepository()
      .createQueryBuilder('show')
      .leftJoinAndMapOne('show.following', 'show.users', 'user', 'user.userId = :userId', { userId })
      .getMany();

    return shows.map(s => ({
      ...s,
      recurring: Boolean(s.recurring),
      following: Boolean(s.following),
    }));
  }

  public async createShow(show: IShowDetails): Promise<IShowDetails> {
    show = (this.mapShowDtoToModel(show) as IShowDetails);
    return this.getShowRepository().save(show);
  }

  // public async updateUser(user: IUser): Promise<IUser> {
  //   return this.getRepository().save(user);
  // }

  // public async deleteUser(userId: number): Promise<void> {
  //   return this.getRepository().deleteById(userId);
  // }

  public async followShow(showId: number, user: IUser): Promise<void> {
    const show = await this.getShowRepository().findOneById(showId, { relations: ['users'] });
    show.users.push((user as any));
    await this.getShowRepository().save(show);
  }

  public async unfollowShow(showId: number, user: IUser): Promise<void> {
    const show = await this.getShowRepository().findOneById(showId, { relations: ['users'] });
    show.users = show.users.filter(u => u.userId !== user.userId);
    await this.getShowRepository().save(show);
  }

  public async markEpisodeWatched(episodeId: number, user: IUser): Promise<void> {
    const episode = await this.getEpisodeRepository().findOneById(episodeId, { relations: ['users'] });
    episode.users.push((user as any));
    await this.getEpisodeRepository().save(episode);
  }

  public async unmarkEpisodeWatched(episodeId: number, user: IUser): Promise<void> {
    const episode = await this.getEpisodeRepository().findOneById(episodeId, { relations: ['users'] });
    episode.users = episode.users.filter(u => u.userId !== user.userId);
    await this.getEpisodeRepository().save(episode);
  }

  public async bulkMarkEpisodeWatched(showId: number, season: number, episode: number, user: IUser): Promise<void> {
    let episodes = await this.getEpisodeRepository()
      .createQueryBuilder('episodes')
      .leftJoinAndSelect('episodes.users', 'users')
      .where({ showShowId: showId, season })
      .andWhere('episodes.episode <= :episode', { episode: episode || 1000 })
      .getMany();

    episodes = episodes.map(e => ({
      ...e,
      users: e.users.concat(user as any),
    }));

    console.log(showId, season, episode);

    await this.getEpisodeRepository().save(episodes);
  }

  public async bulkUnmarkEpisodeWatched(showId: number, season: number, episode: number, user: IUser): Promise<void> {
    let episodes = await this.getEpisodeRepository()
      .createQueryBuilder('episodes')
      .leftJoinAndSelect('episodes.users', 'users')
      .where({ showShowId: showId, season })
      .andWhere('episodes.episode <= :episode', { episode: episode || 1000 })
      .getMany();

    console.log(episode);

    episodes = episodes.map(e => ({
      ...e,
      users: e.users.filter(u => u.userId !== user.userId),
    }));

    await this.getEpisodeRepository().save(episodes);
  }

  private getShowRepository(): Repository<Show> {
    const connection = getConnection();
    return connection.getRepository(Show);
  }
  private getEpisodeRepository(): Repository<Episode> {
    const connection = getConnection();
    return connection.getRepository(Episode);
  }
  private getUserRepository(): Repository<User> {
    const connection = getConnection();
    return connection.getRepository(User);
  }

  private mapShowDtoToModel(show: IShow | IShowDetails): IShow | IShowDetails {
    show.title = show.title.trim();
    if (show.aka) {
      show.aka = show.aka.trim();
    }
    if (!show.slug) {
      show.slug = `${slug(show.title)}-${uniqueSlug()}`;
    }
    if ((show as IShowDetails).episodes) {
      (show as IShowDetails).episodes = (show as IShowDetails).episodes.map(e => ({
        ...e,
        premiereDate: new Date(e.premiereDate),
      }));
    }
    return show;
  }
}

import { inject, injectable } from 'inversify';
import { getConnection, Repository } from 'typeorm';
import * as slug from 'slug';
import * as uniqueSlug from 'unique-slug';
import * as moment from 'moment';

import { IShow, IShowForUser, IShowDetails, IShowDetailsForUser, IEpisodeDetailsForUser, IUser, Show, Episode, User } from '../../entities';

export interface IShowsService {
  getShows: (userId: number) => Promise<IShowForUser[]>;
  getShowBySlug: (slug: string, userId: number) => Promise<IShowDetailsForUser>;
  getEpisodes: (dateFrom: Date, dateTo: Date, noWatched: boolean, userId: number) => Promise<IEpisodeDetailsForUser[]>;
  createShow: (show: IShowDetails) => Promise<IShowDetails>;
  updateShow: (show: IShowDetails) => Promise<IShowDetails>;
  deleteShow: (showId: number) => Promise<void>;
  deleteEpisodes: (showId: number, season: number, episode: number) => Promise<void>;
  postponeEpisodes: (showId: number, season: number, episode: number, newPremiereDate: Date) => Promise<void>;
  followShow: (showId: number, user: IUser) => Promise<void>;
  unfollowShow: (showId: number, user: IUser) => Promise<void>;
  markEpisodeWatched: (episodeId: number, user: IUser) => Promise<void>;
  unmarkEpisodeWatched: (episodeId: number, user: IUser) => Promise<void>;
  bulkMarkEpisodeWatched: (showId: number, season: number, episode: number, user: IUser) => Promise<void>;
  bulkUnmarkEpisodeWatched: (showId: number, season: number, episode: number, user: IUser) => Promise<void>;
}

@injectable()
export class ShowsService implements IShowsService {

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

  public async getEpisodes(dateFrom: Date, dateTo: Date, noWatched: boolean, userId: number): Promise<IEpisodeDetailsForUser[]> {
    let query = await this.getEpisodeRepository()
      .createQueryBuilder('episodes')
      .innerJoinAndSelect('episodes.show', 'show')
      .innerJoin('show.users', 'user', 'user.userId = :userId', { userId })
      .leftJoinAndMapOne('episodes.watched', 'episodes.users', 'watchedUser', 'watchedUser.userId = :userId', { userId })
      .where('1=1');

    if (noWatched) {
      query.andWhere('watchedUser.userId is null');
    }
    if (dateFrom) {
      query.andWhere('episodes.premiereDate >= :dateFrom', { dateFrom: dateFrom.valueOf() });
    }
    if (dateTo) {
      query.andWhere('episodes.premiereDate <= :dateTo', { dateTo: dateTo.valueOf() });
    }

    const episodes: any = await query.getMany();

    return episodes.map(e => ({
      ...e,
      ...e.show,
      show: undefined,
      recurring: Boolean(e.show.recurring),
      watched: Boolean(e.watched),
    }));
  }

  public async createShow(show: IShowDetails): Promise<IShowDetails> {
    show = (this.mapShowDtoToModel(show) as IShowDetails);
    return this.getShowRepository().save(show);
  }

  public async updateShow(show: IShowDetails): Promise<IShowDetails> {
    const oldShow = await this.getShowRepository().findOneById(show.showId);
    if (oldShow.title !== show.title) {
      show.slug = null;
    }
    show = (this.mapShowDtoToModel(show) as IShowDetails);
    return this.getShowRepository().save(show);
  }

  // can't easily remove entities with ManyToMany relations
  public async deleteShow(showId: number): Promise<void> {
    const show = await this.getShowRepository().findOneById(showId);
    await this.deleteEpisodes(showId, null, null);
    await this.getShowRepository().remove(show);
  }

  // can't easily remove entities with ManyToMany relations
  public async deleteEpisodes(showId: number, season: number, episode: number): Promise<void> {
    const q = this.getEpisodeRepository()
      .createQueryBuilder('episodes')
      .where({ showShowId: showId });

    if (season) {
      q.andWhere('episodes.season = :season', { season });
    }
    if (episode) {
      q.andWhere('episodes.episode = :episode', { episode });
    }

    const episodes = await q.getMany();

    await this.getEpisodeRepository().remove(episodes);
  }

  public async postponeEpisodes(showId: number, season: number, episode: number, newPremiereDate: Date): Promise<void> {
    let episodes = await this.getEpisodeRepository()
      .createQueryBuilder('episodes')
      .where({ showShowId: showId, season })
      .andWhere('episodes.episode >= :episode', { episode: episode || 0 })
      .orderBy('episode', 'ASC')
      .getMany();

    const diff = moment(newPremiereDate).diff(episodes[0].premiereDate, 'days');

    episodes = episodes.map(e => ({
      ...e,
      premiereDate: moment(e.premiereDate).add(diff, 'days').toDate(),
    }));

    await this.getEpisodeRepository().save(episodes);
  }

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

    await this.getEpisodeRepository().save(episodes);
  }

  public async bulkUnmarkEpisodeWatched(showId: number, season: number, episode: number, user: IUser): Promise<void> {
    let episodes = await this.getEpisodeRepository()
      .createQueryBuilder('episodes')
      .leftJoinAndSelect('episodes.users', 'users')
      .where({ showShowId: showId, season })
      .andWhere('episodes.episode <= :episode', { episode: episode || 1000 })
      .getMany();

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
      // show.episodes.forEach(element => {
      //   console.log(element.premiereDate, new Date((element.premiereDate)));
      // });
      (show as IShowDetails).episodes = (show as IShowDetails).episodes.map(e => ({
        ...e,
        premiereDate: new Date(e.premiereDate),
      }));
    }
    return show;
  }
}

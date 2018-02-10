import { inject, injectable } from 'inversify';
import { getConnection, Repository } from 'typeorm';
import * as slug from 'slug';
import * as uniqueSlug from 'unique-slug';

import { IShow, IShowForUser, IShowDetails, Show, Episode } from '../../entities';

export interface IShowsService {
  // getShows: () => Promise<IShowForUser[]>;
  // getShow: (showId: number) => Promise<IShowForUser>;
  createShow: (show: IShowDetails) => Promise<IShowDetails>;
  // updateShow: (show: IShowDetails) => Promise<IShowDetails>;
  // deleteShow: (showId: number) => Promise<void>;
}

@injectable()
export class ShowsService implements IShowsService {
  // public async getShows(): Promise<IShowForUser[]> {
  //   return this.getRepository().findOneById(userId);
  // }

  // public async getUserByEmail(email: string): Promise<IUser> {
  //   return this.getRepository().findOne({ email });
  // }

  // public async getUsers(): Promise<IUser[]> {
  //   return this.getRepository().find();
  // }

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

  private getShowRepository(): Repository<Show> {
    const connection = getConnection();
    return connection.getRepository(Show);
  }
  private getEpisodeRepository(): Repository<Episode> {
    const connection = getConnection();
    return connection.getRepository(Episode);
  }

  private mapShowDtoToModel(show: IShow | IShowDetails): IShow | IShowDetails {
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

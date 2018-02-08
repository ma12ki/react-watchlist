import { ShowType, UserRole } from './enums';

export interface IShow {
  showId: number;
  slug: string;
  title: string;
  aka: string;
  type: ShowType;
  recurring: boolean;
}

export interface IShowForUser extends IShow {
  following: boolean;
}

export interface IEpisode {
  episodeId: number;
  season: number;
  episode: number;
  premiereDate: Date;
}

export interface IEpisodeForUser extends IEpisode {
  watched: boolean;
}

export interface IEpisodeDetails extends IShow, IEpisode {}

export interface IEpisodeDetailsForUser extends IShowForUser, IEpisodeForUser {}

export interface IUser {
  userId: number;
  email: string;
  role: UserRole;
}

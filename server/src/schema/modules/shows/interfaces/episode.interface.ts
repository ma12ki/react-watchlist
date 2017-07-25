export interface INewEpisode {
  showId: string;
  season: number;
  episode: number;
  premiereDate: string;
}

export interface IEpisode extends INewEpisode {
  _id: any;
}

export interface INewUserEpisode {
  userId: string;
  showId: string;
  episodeId: string;
}

export interface IUserEpisode extends INewUserEpisode {
  _id: any;
}

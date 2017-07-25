export interface INewUserShow {
  userId: string;
  showId: string;
  tracked: boolean;
}

export interface IUserShow extends INewUserShow {
  _id: any;
}

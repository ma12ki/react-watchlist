export interface INewShow {
  name: string;
  premiereDate: string;
  category: string;
  frequency: string;
}

export interface IShow extends INewShow {
  _id: any;
}

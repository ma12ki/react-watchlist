export interface IResolver {
  (...args: any[]): any;
  name?: string;
  description?: string;
}

export interface IResolvers {
  [key: string]: IResolver;
}

export interface IModule {
  queries: string;
  queryResolvers: IResolvers;
  mutations: string;
  mutationResolvers: IResolvers;
  typeDefs: string[];
  typeResolvers: {
    [key: string]: IResolvers,
  };
}

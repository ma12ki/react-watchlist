import { IModule } from './shared/module.interface';

import { showsModule } from './shows';
import { usersModule } from './users';

const modules: IModule[] = [
  showsModule,
  usersModule,
];

const buildRootQuery = () => {
  let q = `
    type Query {
  `;
  modules.forEach((module) => {
    q += `
      ${module.queries}
    `;
  });
  q += `}`;
  return q;
};

const buildRootMutation = () => {
  let m = `
    type Mutation {
  `;
  modules.forEach((module) => {
    m += `
      ${module.mutations}
    `;
  });
  m += `}`;
  return m;
};

const buildRootResolver = () => {
  let r = {
    Query: {},
    Mutation: {},
  };
  modules.forEach((module) => {
    r.Query = {
      ...r.Query,
      ...module.queryResolvers,
    };
    r.Mutation = {
      ...r.Mutation,
      ...module.mutationResolvers,
    };
    r = {
      ...r,
      ...module.typeResolvers,
    };
  });
  return r;
};

const buildTypeDefs = () => {
  let t = [];
  modules.forEach((module) => {
    t = t.concat(...module.typeDefs);
  });
  return t;
};

export const root = {
  query: buildRootQuery(),
  mutation: buildRootMutation(),
  resolver: buildRootResolver(),
  typeDefs: buildTypeDefs(),
};

import { IModule } from '../shared';
import logIn from './log-in';
import addUser from './add-user';
import * as shared from './shared';

// queries
const queries = `
`;

const queryResolvers = {
};

// types
const typeDefs = [
  ...shared.typeDefs,
];

const typeResolvers = {
};

// mutations
const mutations = `
  ${logIn.mutation}
  ${addUser.mutation}
`;

const mutationResolvers = {
  ...logIn.resolver,
  ...addUser.resolver,
};

export const usersModule: IModule = {
  queries,
  queryResolvers,
  typeDefs,
  typeResolvers,
  mutations,
  mutationResolvers,
};

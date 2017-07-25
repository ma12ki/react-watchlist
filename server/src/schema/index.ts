import { GraphQLSchema } from 'graphql';
import { addMockFunctionsToSchema, makeExecutableSchema } from 'graphql-tools';

import { root } from './modules';

const typeDefs = [`
  schema {
    query: Query
    mutation: Mutation
  }
`,
  root.query,
  root.mutation,
  ...root.typeDefs,
];

const Schema: GraphQLSchema = makeExecutableSchema({
  logger: console,
  resolverValidationOptions: {
    requireResolversForNonScalar: false,
  },
  resolvers: root.resolver,
  typeDefs,
});
addMockFunctionsToSchema({
  mocks: {},
  preserveResolvers: true,
  schema: Schema,
});

export { Schema };

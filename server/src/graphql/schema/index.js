import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql/type';

import userQuery from './user/user.query';
import { createUser, login } from './user/user.mutation';
import User from '../../mongoose/user';

var schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      user: userQuery
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createUser,
      login,
    }
  })
});

export default schema;
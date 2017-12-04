import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql/type';

import userQuery from './user/user.query';
import { createUser, login } from './user/user.mutation';
import User from '../../mongoose/user';

/**
 * generate projection object for mongoose
 * @param  {Object} fieldASTs
 * @return {Project}
 */
export function getProjection (fieldASTs) {
  return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
    projections[selection.name.value] = true;
    return projections;
  }, {});
}



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
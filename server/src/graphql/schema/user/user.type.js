import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
} from 'graphql/type';
  
const type = new GraphQLObjectType({
  name: 'user',
  description: 'user',
  fields: () => ({
    email: {
      type: GraphQLString,
      description: 'The email of the user',
    },
    admin: {
      type: GraphQLBoolean,
      description: 'Whether the user is admin',
    },
    token: {
      type: GraphQLString,
      description: 'The token of the user',
    }
  })
});

export default type;
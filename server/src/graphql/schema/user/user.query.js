import {
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
} from 'graphql/type';

import userType from './user.type';
import User from '../../../mongoose/user'
import getProjection from '../../util/getProjection';
import { checkAdmin } from '../../../controller/auth/auth.controller'

const query = {
  type: new GraphQLList(userType),
  args: {
    email: {
      name: 'email',
      type: GraphQLString
    }
  },
  resolve: (obj, {email}, source, fieldASTs) => {
    checkAdmin(source.headers);
    var projections = getProjection(fieldASTs);
    const query = {}
    if(email) query.email = email;
    return User.find(query, projections);
  }
}

export default query;
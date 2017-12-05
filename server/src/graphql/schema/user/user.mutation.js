import {
  GraphQLString,
  GraphQLNonNull
} from 'graphql/type';
import jwt from 'jsonwebtoken';
import { checkAdmin, login as login_ } from '../../../controller/auth/auth.controller';
import userType from './user.type';
import User from '../../../mongoose/user';

const createUser = {
  type: userType,
  args: {
    email: {
      name: 'name',
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      name: 'password',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (obj, {email, password}, source, fieldASTs) => {
    checkAdmin(source.headers);
    return User.create(email, password);
  }
};

const login = {
  type: userType,
  args: {
    email: {
      name: 'name',
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      name: 'password',
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: (obj, {email, password}, source, fieldASTs) => {
    return login_({email, password});
  }
};

export { createUser, login };
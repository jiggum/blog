import {
  GraphQLString,
  GraphQLNonNull
} from 'graphql/type';
import jwt from 'jsonwebtoken';

import userType from './user.type';
import User from '../../../mongoose/user';
import { JWT_SECRET } from '../../../config';


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
    return User.findByEmail(email)
    .then(user => {
      // check user is exists
      if(!user) throw new Error('unregistered email');
      // check the password
      if(!user.verify(password)) throw new Error('unmatched password');
      // create a promise that generates jwt asynchronously
      return new Promise((resolve, reject) => {
        jwt.sign(
          {
            _id: user._id,
            email: user.email,
            admin: user.admin
          }, 
          JWT_SECRET,
          {
            expiresIn: '7d',
            issuer: 'dongmin.com',
            subject: 'userInfo'
          }, (err, token) => {
            if (err) reject(err);
            resolve({
              email: user.email,
              admin: user.admin,
              token
            });
          })
        }
      );
    })
  }
};

export { createUser, login };
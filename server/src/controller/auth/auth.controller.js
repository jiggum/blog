import jwt from 'jsonwebtoken';
import User from '../../mongoose/user';
import {
  JWT_SECRET,
  TOKEN_EXPIRE_TIME,
  DOMAIN,
} from '../../config';

export async function login({email, password}) {
  const user = await User.findByEmail(email);
  // check user is exists
  if(!user) throw new Error('unregistered email');
  // check the password
  if(!user.verify(password)) throw new Error('unmatched password');
  // create a promise that generates jwt asynchronously
  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
      admin: user.admin
    }, 
    JWT_SECRET,
    {
      expiresIn: TOKEN_EXPIRE_TIME,
      issuer: DOMAIN,
      subject: 'userInfo'
    })
  return {
    email: user.email,
    admin: user.admin,
    token
  };
}

export function checkTokenExist(headers) {
  if(!headers.authorization) throw new Error('missing authorization header');
  const [type, token] = headers.authorization.split(' ');
  if(type !== "Bearer") throw new Error('unvaild authorization type');
  if(!token) throw new Error('missing authorization token');
  return token;
}

export function checkValidUser(headers) {
  const token = checkTokenExist(headers);
  return jwt.verify(token, JWT_SECRET);
}

export function checkAdmin(headers) {
  const {admin} = checkValidUser(headers);
  if(!admin) throw new Error('only admin can access');
  return true;
}


import mongoose from 'mongoose';
import crypto from 'crypto';
import { emailRegex, passwordRegex } from '../util/regex';
import { PASSWORD_SECRET } from '../config';

var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    unique: true,
    match: [emailRegex, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  admin: {
    type: Boolean,
    default: false
  }
});

const encryptPassword = password => {
  return crypto.createHmac('sha256', PASSWORD_SECRET)
  .update(password)
  .digest('base64');
}

userSchema.statics.create = function(email, password) {
  const user = new this({
    email,
    password: encryptPassword(password),
  })

  return user.save();
}

userSchema.statics.findByEmail = function(email) {
  return this.findOne({
    email
  }).exec();
}

userSchema.methods.verify = function(password) {
  return this.password === encryptPassword(password);
}

var User = mongoose.model('User', userSchema);

export default User;
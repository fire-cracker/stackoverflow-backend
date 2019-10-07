import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import db from './index';

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

userSchema.pre('save', async function(next) {
  if ( this.password && this.isModified('password') ) {
    const salt = await bcrypt.genSaltSync();
    this.password = await bcrypt.hashSync(this.password, salt);
  }
  next();
});

userSchema.methods.validatePassword = async function validatePassword(newPassword) {
  return bcrypt.compareSync(newPassword, this.password);
};

const User = db.model('User', userSchema);


export default User;

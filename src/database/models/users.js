import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

import db from './index';

const Schema = mongoose.Schema

  const userSchema = new Schema({
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      }
  });

const User = db.model('User', userSchema)

  User.beforeCreate(async customer => {
    customer.password = await customer.generatePasswordHash();
  });

  User.prototype.generatePasswordHash = async function generatePasswordHash() {
    const saltRounds = 8;
    return bcrypt.hash(this.password, saltRounds);
  };

  User.prototype.validatePassword = async function validatePassword(password) {
    return bcrypt.compare(password, this.password);
  };

  User.prototype.getSafeDataValues = function getSafeDataValues() {
    const { password, ...data } = this.dataValues;
    return data;
  };


export default User;

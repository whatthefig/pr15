const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const MyError = require('../modules/error');

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    index: { unique: true },
    default: uuid.v4,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    minlength: 2,
    required: true,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator(str) {
        return validator.isURL(str);
      },
      message: 'Эта строка должна быть URL',
    },
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator(str) {
        return validator.isEmail(str);
      },
      message: 'Эта строка должна быть EMAIL',
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 8,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new MyError('Неправильные почта или пароль', 401);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new MyError('Неправильные почта или пароль', 401);
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);

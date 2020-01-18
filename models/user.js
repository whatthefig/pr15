const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

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
  emalil: {
    type: String,
    validate: {
      validator(str) {
        return validator.isEMAIL(str);
      },
      message: 'Эта строка должна быть EMAIL',
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);

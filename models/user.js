const mongoose = require('mongoose');
const validator = require('validator');
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
});

module.exports = mongoose.model('user', userSchema);

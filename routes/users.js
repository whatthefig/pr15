const userRout = require('express').Router();
const {
  getUsers, findUser,
} = require('../controllers/users');

userRout.get('/users', getUsers);
userRout.get('/users/:id', findUser);

module.exports = userRout;

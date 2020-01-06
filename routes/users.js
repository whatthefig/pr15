const userRout = require('express').Router();
const {
  getUsers, createUser, findUser,
} = require('../controllers/users');

userRout.get('/users', getUsers);
userRout.get('/users/:id', findUser);
userRout.post('/users', createUser);

module.exports = userRout;

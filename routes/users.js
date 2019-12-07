const users = require('../data/users.json');
const routesUsers = require('express').Router();


routesUsers.get('/users', (req, res) =>{
  res.send(users);
});

routesUsers.get('/users/:id', (req, res) =>{
  const {id} = req.params;
  const user = users.find(user => id === user._id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ "message": "Нет пользователя с таким id" });
  }
});

module.exports = routesUsers;
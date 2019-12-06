const users = require('../data/users.json');
const routesUsers = require('express').Router();


routesUsers.get('/users/:id', (req, res) => {
  const { id } = req.params;

  if (!users[id]) {
      res.send({ "message": "Нет пользователя с таким id" });
      return;
  }
  res.send(users[id]);
});


module.exports = routesUsers;
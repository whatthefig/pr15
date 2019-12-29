const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.findUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) throw ({ message: 'Нет пользователя с таким id' });
      return user;
    })
    .then((user) => res.send(user))
    .catch((err) => res.status(404).send({ message: err }));
}

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err }));
};

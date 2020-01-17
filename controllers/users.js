const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.findUser = (req, res) => {
  const { id } = req.params;
  class MyError extends Error {
    constructor(message, code) {
      super(message);
      this.code = code;
    }
  }
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new MyError('Пользователь не найден', 404);
      }
      res.json(user);
    })
    .catch((err) => res.status(err.code || 500).json({ message: err.message }));
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch((err) => res.status(500).send({ message: err }));
};

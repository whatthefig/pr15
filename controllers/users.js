const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.findUser = (req, res) => {
  const { _id } = req.params;
  User.findById(_id)
    .then((user) => {
      const error = { message: 'Пользователь не найден', code: 404 };
      if (!user) {
        throw error;
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

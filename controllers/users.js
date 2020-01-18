const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports.createUser = (req, res) => {
  bcrypt.hash(req.body.password, 10);
  const {
    name, about, avatar, email,
  } = req.body
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
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

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then(() => {
      const token = jwt.sign({ _id: 'd285e3dceed844f902650f40' }, 'some-secret-key', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .end();
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};

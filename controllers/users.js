const { NODE_ENV, JWT_SECRET } = process.env;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const MyError = require('../modules/error');

module.exports.findUser = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        throw new MyError('Пользователь не найден', 404);
      }
      res.json(user);
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.json(users))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new MyError('Пользователь с такими данными уже зарегистрирован', 409);
      }
      bcrypt.hash(req.body.password, 10)
        .then((hash) => User.create({
          name, about, avatar, email, password: hash,
        }))
        .then(() => {
          res.send({ message: 'Пользователь создан' });
        });
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  console.log(JWT_SECRET);
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev', { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 3600 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        })
        .end();
    })
    .catch(next);
};

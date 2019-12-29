const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link, owner, likes, createdAt } = req.body;
  Card.create({ name, link, owner, likes, createdAt })
    .then((card) => res.send({ card }))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      // eslint-disable-next-line no-throw-literal
      if (!card) throw ({ message: 'Пользователь не найден' });
      return card;
    })
    .then((card) => res.send(card))
    .catch((err) => res.status(404).send({ message: err }));
};

module.exports.getCard = (req, res) => {
  Card.find({})
    .then((card) => res.send({ card }))
    .catch((err) => res.status(500).send({ message: err }));
};
const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const {
    name, link, likes, createdAt,
  } = req.body;
  const owner = req.user._id;
  Card.create({
    name, link, owner, likes, createdAt,
  })
    .then((card) => res.send({ card }))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      const error = 'Объект не найден';
      if (!card) throw error;
      return card;
    })
    .then((card) => res.send(card))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((card) => res.send({ card }))
    .catch((err) => res.status(500).send({ message: err }));
};

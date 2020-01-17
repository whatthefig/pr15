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
  const { id } = req.params;
  Card.findByIdAndDelete(id)
    .then((card) => {
      const error = { message: 'Объект не найден', code: 404 };
      if (!card) {
        throw error;
      }
      res.json(card);
    })
    .catch((err) => res.status(err.code || 500).json({ message: err.message }));
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch((err) => res.status(500).send({ message: err }));
};

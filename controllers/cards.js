const Card = require('../models/card');
const MyError = require('../modules/error');

module.exports.createCard = (req, res) => {
  const {
    name, link, likes,
  } = req.body;
  const owner = req.user._id;
  Card.create({
    name, link, owner, likes,
  })
    .then((card) => res.send({ card }))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.deleteCard = (req, res) => {
  const { id } = req.params;
  Card.findByIdAndDelete(id)
    .then((card) => {
      if (!card) {
        throw new MyError('Объект не найден', 404);
      }
      if (card.owner.toString() !== id) {
        throw new MyError('Недостаточно прав', 405);
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

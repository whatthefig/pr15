const Card = require('../models/card');
const MyError = require('../modules/error');

module.exports.createCard = (req, res, next) => {
  const {
    name, link, likes,
  } = req.body;
  const owner = req.user.id;
  Card.create({
    name, link, owner, likes,
  })
    .then((card) => res.send({ card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { id } = req.params;
  Card.findOne({ id })
    .then((card) => {
      if (!card) {
        throw new MyError('Объект не найден', 404);
      }
      if (card.owner !== req.user.id) {
        throw new MyError('Недостаточно прав', 401);
      } else {
        Card.findOneAndDelete({ id })
          .then(() => res.send({ message: 'Объект удален' }))
          .catch(next);
      }
    })
    .catch(next);
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch(next);
};

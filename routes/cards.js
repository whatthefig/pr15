const cardsRout = require('express').Router();
const {
  createCard, getCards, deleteCard,
} = require('../controllers/cards');

cardsRout.post('/cards', createCard);
cardsRout.delete('/cards/:_id', deleteCard);
cardsRout.get('/cards', getCards);

module.exports = cardsRout;

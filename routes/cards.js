const cardsRout = require('express').Router();
const { createCard, getCards, deleteCard } = require('../controllers/cards');

cardsRout.post('/cards', createCard);
cardsRout.delete('/cards/:cardId', deleteCard);
cardsRout.get('/cards', getCards);

module.exports = cardsRout;

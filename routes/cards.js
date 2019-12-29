const cardsRout = require('express').Router();
const { createCard, getCard, deleteCard } = require('../controllers/cards');

cardsRout.post('/cards', createCard);
cardsRout.delete('/cards/:cardId', deleteCard);
cardsRout.get('/cards', getCard);

module.exports = cardsRout;

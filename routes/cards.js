const cards =  require('../data/cards.json');
const routesCards = require('express').Router();

routesCards.get('/cards',(res) =>{
  res.send(cards);
});

module.exports = routesCards;
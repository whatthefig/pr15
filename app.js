const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cardsRout = require('./routes/cards');
const userRout = require('./routes/users');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mybd', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };

  next();
});

app.use('/', userRout);
app.use('/', cardsRout);
app.use((req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Используется порт ${PORT}`);
});

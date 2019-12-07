
const express = require('express');
const routesUsers  = require('./routes/users');
const routesCards = require('./routes/cards');
const app = express();
const { PORT = 3000 } = process.env;


app.use('/', routesUsers);
app.use('/', routesCards);
app.use(express.static('public'));
app.use((res) => {
  res.status(404).send({ "message": "Запрашиваемый ресурс не найден" });
})

app.listen(PORT, () => {
    console.log(`Используется порт ${PORT}`);
})
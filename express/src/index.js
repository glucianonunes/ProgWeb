const express = require("express");
const router = require("../config/routes")
const logger = require("morgan") // Morgan é um middleware usado para registros de logs
const handlebars = require('express-handlebars');

const app = express();

const PORT = 3456;


app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);

app.use(router)


app.engine("handlebars", handlebars.engine({
  helpers: require(`${__dirname}/views/helpers/helpers.js`)
}));

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});

const express = require("express");
const router = require("../src/router/router")
const logger = require("morgan") // Morgan é um middleware usado para registros de logs
const handlebars = require('express-handlebars');
const sass = require('node-sass-middleware');


const app = express();



app.use(sass({
src: `${__dirname}/../public/scss`,
dest: `${__dirname}/../public/css`,
outputStyle: "compressed",
prefix: "/css",
}));
app.use("/css", express.static(`${__dirname}/../public/css`));

const PORT = 3456;


app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
//  app.use(express.static(`public/img`));
app.set("views", `${__dirname}/views`);

app.use('/img', [
  express.static(`${__dirname}/public/img`)
  ]);


app.use(router)


app.engine("handlebars", handlebars.engine({
  helpers: require(`${__dirname}/views/helpers/helpers.js`)
}));

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});

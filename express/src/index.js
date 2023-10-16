const express = require("express");
const router = require("../src/router/router")
const logger = require("morgan") // Morgan é um middleware usado para registros de logs
const handlebars = require('express-handlebars');
const sass = require('node-sass-middleware');

const app = express();
const PORT = 3456;

app.engine("handlebars", handlebars.engine({
  helpers: require(`${__dirname}/views/helpers/helpers.js`),
  layoutsDir: `${__dirname}/views/layouts`,
  defaultLayout: 'main'
}));


app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);


app.use(sass({
src: `${__dirname}/../public/scss`,
dest: `${__dirname}/../public/css`,
outputStyle: "compressed",
prefix: "/css",
}));

app.use("/css", express.static(`${__dirname}/../public/css`));
app.use('/img', express.static(`${__dirname}/../public/img`));
app.use('/webfonts', express.static(`${__dirname}/../node_modules/@fortawesome/fontawesome-free/webfonts`))
app.use("/js", [
  express.static(`${__dirname}/../public/js`),
  express.static(`${__dirname}/../node_modules/bootstrap/dist/js/`),
  express.static(`${__dirname}/../node_modules/@popperjs/core/dist/umd/`)

]);

app.use(router)


app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});

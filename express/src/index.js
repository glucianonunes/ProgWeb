const express = require("express");
const router = require("./router/router");
const handlebars = require('express-handlebars');
const logger = require("morgan");

const app = express();


app.engine("handlebars", handlebars.engine); // Remove the parentheses ()
app.set("view engine", "handlebars");
app.set("views", `${__dirname}/views`);




const PORT = 3456;


app.use(logger("dev")); // Change "complete" to "dev" for the logger

app.use("/img", express.static(`${__dirname}/../public/img`));



app.use(router);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;

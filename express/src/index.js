const express = require("express")
const app = express()
const logger = require("morgan")

const PORT = 3456
const router = require("./router/router")

app.use(logger("complete"))
app.use("/img", express.static(`${__dirname}/../public/img`))

app.use(router)




app.listen(PORT)
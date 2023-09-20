const express = require("express")
const router = express.Router()

app.get("/sobre", (req, res) => {
    res.send("Sobre minha aplicação")
})

module.exports = router
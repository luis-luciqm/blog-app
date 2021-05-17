// Carregando modulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
// const mongoose = require('mongoose')
const app = express()

// Configurações

// Rotas

// Outros
const PORT = 5000
app.listen(PORT, (req, res) => {
    console.log("Server is running port " + PORT)
})

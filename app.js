// Carregando modulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
// const mongoose = require('mongoose')
const app = express()

// Configurações

// configurando body-parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json()) // em caso de erro, ver link salvo no chrome

// configurando handlebars
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Rotas
app.get('/', (req, res) => {
    res.send('Blog-APP')
})

// Outros
const PORT = 5000
app.listen(PORT, (req, res) => {
    console.log("Server is running port " + PORT)
})

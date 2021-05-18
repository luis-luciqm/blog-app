// Carregando modulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const admin = require('./routes/admin') // importando arquivo de rotas de maneira correta
// const mongoose = require('mongoose')
const app = express()
const path = require('path') // importando para configurar pasta public, path serve para manipular pastas

// Configurações
// configurando body-parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json()) // em caso de erro, ver link salvo no chrome

// configurando handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Mongoose

// Public
app.use(express.static(path.join(__dirname, "public")))
// a pasta que está guardando todos os arquivos estaticos é a pasta public

// Rotas
// obs: rotas sempre abaixo das configurações
app.use('/admin', admin)
// prefixo '/admin'
// Ex: localhost:prefixo/rota
// localhost:admin/posts


// Outros
const PORT = 5000
app.listen(PORT, (req, res) => {
    console.log("Server is running port " + PORT)
})

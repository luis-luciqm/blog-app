// Carregando modulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const admin = require('./routes/admin') // importando arquivo de rotas de maneira correta
const mongoose = require('mongoose')
const app = express()
const path = require('path') // importando para configurar pasta public, path serve para manipular pastas
const session = require('express-session') // importando pacote session
const flash = require('connect-flash') // importando pacote connect flash

// Configurações

app.use(session({ // configurando session
    secret: "blog-appNode", // chave secreta que gera a session
    resave: true,
    saveUninitialized: true
}))
app.use(flash()) // configurando flash

// Middlewares
app.use((req, res, next) => {
    // criando variaveis globais com locals
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    next() // sempre tem que ter o next() na middlewares
})

// configurando body-parser
app.use(bodyParser.urlencoded({extended: true})) // tudo com app.use() é uma Middleware
app.use(bodyParser.json()) // em caso de erro, ver link salvo no chrome

// configurando handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Mongoose
// conectando ao mongoose. ps: mongo deve estar ligado
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost/blogapp").then(() => {
    console.log("\nConexão com mongoose realizada com sucesso!\n")
}).catch((err) => {
    console.log("\nErro ao conectar ao mongoose! Erro: " + err)
})


// Public
app.use(express.static(path.join(__dirname, "public")))
// a pasta que está guardando todos os arquivos estaticos é a pasta public

// Rotas
// obs: rotas sempre abaixo das configurações
app.use('/admin', admin)
// prefixo '/admin'
// Ex: localhost:prefixo/rota
// localhost:admin/posts

app.use((req, res, next) => {
    console.log("Olá, eu sou um Middlewares")
    next()
})

// Outros
const PORT = 5000
app.listen(PORT, (req, res) => {
    console.log("\nServer is running port " + PORT)
})

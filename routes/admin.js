// rotas destinadas para pagina admin, grupo de rotas
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model("categorias") // no parametro de model, é colocado o nome que foi dado ao arquivo Categoria

router.get('/', (req, res) => {
    res.render("admin/index")
})

router.get('/posts', (req, res) => {
    res.send("Pagina de posts")
})

router.get('/categorias', (req, res) => {
    res.render("admin/categorias")
})

router.get('/categorias/add', (req, res) => {
    res.render("admin/addcategoria")
})

router.post('/categorias/nova', (req, res) => {
    const novaCategoria = {
        nome: req.body.nome, // pegando dados do formulario
        slug: req.body.slug
    }

    new Categoria(novaCategoria).save().then(() => { // salvando no banco de dados
        console.log("Categoria salva com sucesso")
    }).catch((err) => {
        console.log("Erro ao salvar categoria: " + err)
    })

})

module.exports = router // exportando router
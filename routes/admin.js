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
    Categoria.find().sort({date: 'desc'}).lean().then((categorias) => { // pegando dados das collections. todo model no mongoose tem uma função find(), vai listar todas as categorias que existem
        res.render('admin/categorias', {categorias: categorias})
    }).catch((err) => {
        req.flash("error_msg", "Houve um erro ao listar categorias!" + err)
        res.redirect("/admin")
    })
})

router.get('/categorias/add', (req, res) => {
    res.render("admin/addcategoria")
})

router.post('/categorias/nova', (req, res) => { // essa é a rota que irá salvar os dados no banco, collections    
    // validações 
    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome Inválido"})
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto: "Slug Inválido"})
    }

    if(req.body.nome.length < 2){
        erros.push({texto: "Nome pequeno"})
    }

    if(erros.length > 0){
        res.render("admin/addcategoria", {erros: erros})
    }else{
        // se não existe nenhum erro no formulário
        const novaCategoria = {
            nome: req.body.nome, // pegando dados do formulario
            slug: req.body.slug
        }
    
        new Categoria(novaCategoria).save().then(() => { // salvando no banco de dados
            req.flash("success_msg", "Categoria salva com sucesso!")
            res.redirect("/admin/categorias") // se o cadastro der certo, irá redirecionar para a pagina de categorias
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao salvar a categoria")
            res.redirect("/admin")
        })
    }
})

module.exports = router // exportando router
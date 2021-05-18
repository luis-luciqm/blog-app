// rotas destinadas para pagina admin, grupo de rotas

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render("admin/index")
})

router.get('/posts', (req, res) => {
    res.send("Pagina de posts")
})

router.get('/cadCategorias', (req, res) => {
    res.send("Pagina de categorias")
})

module.exports = router // exportando router
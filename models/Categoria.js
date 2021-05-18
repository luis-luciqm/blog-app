const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Categoria = new Schema({ // criando nova categoria
    nome: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        require: true
    },
    data: {
        type: Date,
        default: Date.now() // será cadastrado a data exata do momento do cadastro, pegando a data de agora
    }
})

mongoose.model("categorias", Categoria)
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Postagem = new Schema({
    titulo: {
        type: String,
        require: true
    },
    slug: {
        type: String,
        require: true
    },
    descricao: {
        type: String,
        require: true
    },
    conteudo: {
        type: String,
        require: true
    },
    categoria: {
        type: Schema.types.ObjectId, // fazendo relacionamento de uma categoria, irá armazenar um id de uma categoria
        ref: "categorias", // aqui passa o nome do model Categorias
        require: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("postagens", Postagem)
// "postagens" é a collection que será criada. Postagem é o meu model
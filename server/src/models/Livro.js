import mongoose from "mongoose";
import { autorSchema } from "./Autor.js"

const livroSchema = new mongoose.Schema({
    titulo: { type: String, required: true, unique: true },
    editora: { type: String, required: true },
    paginas: { type: Number },
    preco: { type: Number },
    autor: autorSchema
}, { versionKey: false });

const Livro = mongoose.model('livros', livroSchema);

export default Livro; 
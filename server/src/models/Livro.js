import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";
import { editoraSchema } from "./Editora.js";

const livroSchema = new mongoose.Schema({
    titulo: { type: String, required: true, unique: true },
    editora: editoraSchema,
    paginas: { type: Number },
    preco: { type: Number },
    autor: autorSchema
}, { versionKey: false });

const Livro = mongoose.model("livros", livroSchema);

export default Livro;
import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
    titulo: { type: String, required: true, unique: true },
    editora: { type: mongoose.Schema.Types.ObjectId, ref: "editoras", required: true },
    paginas: { type: Number },
    preco: { type: Number },
    autor: { type: mongoose.Schema.Types.ObjectId, ref: "autores", required: true }
}, { versionKey: false });

const Livro = mongoose.model("livros", livroSchema);

export default Livro;
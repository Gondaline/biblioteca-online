import mongoose from "mongoose";

const livroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, "O título do livro é obrigatório"],
        unique: true
    },
    editora: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "editoras",
        required: [true, "A editora do livro é obrigatória"]
    },
    paginas: { type: Number },
    preco: { type: Number },
    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "autores",
        required: [true, "O autor do livro é obrigatório"]
    }
}, { versionKey: false });

const Livro = mongoose.model("livros", livroSchema);

export default Livro;
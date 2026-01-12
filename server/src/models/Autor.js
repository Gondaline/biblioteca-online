import mongoose from "mongoose";

const autorSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "O(a) autor(a) é obrigatório"]
    },
    nacionalidade: {
        type: String,
        required: [true, "A nacionalidade do(a) autor(a) é obrigatória"]
    },
    qtd_livros_publicados: {
        type: Number, required: [true, "A quantidade de livros publicados é obrigatória"]
    }
}, { versionKey: false });

const Autor = mongoose.model("autores", autorSchema);

export default Autor;
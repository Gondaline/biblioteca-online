import mongoose from "mongoose";

const editoraSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, "O nome do(a) editora é obrigatório"]
    },
    pais: {
        type: String,
        required: [true, "O nome do pais é obrigatório"]
    },
    anoFuncao: {
        type: Date,
        required: [true, "O ano de fundação é obrigatório"]
    }
}, { versionKey: false });

const Editora = mongoose.model("editoras", editoraSchema);

export default Editora;
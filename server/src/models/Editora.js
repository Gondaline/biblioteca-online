import mongoose from "mongoose";

const editoraSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    pais: { type: String, required: true },
    anoFuncao: { type: Date, required: true }
}, { versionKey: false });

const Editora = mongoose.model("editoras", editoraSchema);

export default Editora;
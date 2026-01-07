import Livro from "../models/Livro.js";
import Autor from "../models/Autor.js";
import Editora from "../models/Editora.js";
import validarObjectId from "../auxilies/validarObjectId.js";

export default class LivroController {

    static async listar(req, res) {
        try {
            const data = await Livro.find()
                .populate("autor")
                .populate("editora");

            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({
                message: "Erro ao consultar livros",
                error: err.message
            });
        }
    };

    static async listarPorID(req, res) {
        try {
            const id = req.params.id;
            if (!validarObjectId(id)) return res.status(400).json({ message: "ID inválido" });

            const data = await Livro.findById(id)
                .populate("autor")
                .populate("editora");

            if (!data) return res.status(404).json({ message: "Livro não encontrado" });

            return res.status(200).json(data);

        } catch (err) {
            return res.status(500).json({
                message: "Erro ao consultar livro",
                error: err.message,
            });
        }
    };

    static async adicionar(req, res) {
        try {
            const { titulo, editora, paginas, preco, autor } = req.body;
            const autorEncontrado = await Autor.findById(autor);
            const editoraEncontrada = await Editora.findById(editora);

            if (!validarObjectId(autor) || !validarObjectId(editora)) return res.status(400).json({ message: "Autor ou Editora inválidos" });
            if (!autorEncontrado) return res.status(404).send({ message: "Autor não encontrado" });
            if (!editoraEncontrada) return res.status(404).send({ message: "Editora não encontrada" });

            const livroCriado = await Livro.create({
                titulo,
                editora,
                paginas,
                preco,
                autor
            });

            return res.status(201).json({
                message: "Livro criado com sucesso",
                livro: livroCriado,
            });
        } catch (err) {
            return res.status(500).json({
                message: "Erro ao criar livro",
                error: err.message,
            });
        }
    };

    static async deletar(req, res) {
        try {
            const id = req.params.id;
            if (!validarObjectId(id)) return res.status(400).json({ message: "ID inválido" });

            const data = await Livro.deleteOne({ _id: id });
            if (data.deletedCount === 0) return res.status(404).json({ message: "Livro não encontrado" });

            return res.status(200).json({ message: "Livro deletado com sucesso" });
        } catch (err) {
            return res.status(500).json({
                message: "Erro ao deletar livro",
                error: err.message
            });
        }
    };

    static async editar(req, res) {
        try {
            const { titulo, editora, paginas, preco } = req.body;

            const id = req.params.id;
            
            if (!validarObjectId(id)) return res.status(400).json({ message: "ID inválido" });
            if (editora && !validarObjectId(editora))  return res.status(400).json({ message: "ID de editora inválido" });

            const data = await Livro.findByIdAndUpdate(
                id,
                { titulo, editora, paginas, preco },
                { new: true }
            );

            if (!data) return res.status(404).json({ message: "Livro não encontrado" });

            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({
                message: "Erro ao atualizar livro",
                error: err.message
            });
        }
    }

    static async listarPorEditora(req, res) {
        try {
            const editoraId = req.query.editora;

            if (!validarObjectId(editoraId)) return res.status(400).json({ message: "ID de editora inválido" });

            const livrosPorEditora = await Livro.find({ editora: editoraId })
                .populate("autor")
                .populate("editora");

            return res.status(200).json(livrosPorEditora);
        } catch (err) {
            return res.status(500).json({
                message: "Erro ao listar livros",
                error: err.message
            });
        }
    };
};
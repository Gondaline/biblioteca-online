import Livro from "../models/Livro.js";
import { Autor } from "../models/Autor.js";
import { Editora } from "../models/Editora.js";

export default class LivroController {

    static async listar(req, res) {
        try {
            const data = await Livro.find({});
            return res.status(200).json(data);
        } catch (err) {
            res.status(500).send({
                message: "Erro ao consultar livros",
                error: err.message
            });
        }
    };

    static async listarPorID(req, res) {
        try {
            const id = req.params.id;
            const data = await Livro.findById({ _id: id });
            return res.status(200).json(data);
        } catch (err) {
            res.status(500).json({
                message: "Erro ao consultar livro",
                error: err.message,
            });
        }
    };

    static async adicionar(req, res) {
        const { titulo, editora, paginas, preco, autor } = req.body;
        try {
            const autorEncontrado = await Autor.findById(autor);
            const editoraEncontrada = await Editora.findById(editora);

            if (!autorEncontrado) return res.status(404).send({ message: "Autor não encontrado" });
            if (!editoraEncontrada) return res.status(404).send({ message: "Editora não encontrada" });

            const livroCompleto = {
                titulo,
                editora: { ...editoraEncontrada._doc },
                paginas,
                preco,
                autor: { ...autorEncontrado._doc }
            };
            const livroCriado = await Livro.create(livroCompleto);
            return res.status(201).json({
                message: "Livro criado com sucesso",
                livro: livroCriado,
            });
        } catch (err) {
            res.status(500).json({
                message: "Erro ao criar livro",
                error: err.message,
            });
        }
    };

    static async deletar(req, res) {
        const id = req.params.id;
        try {
            const data = await Livro.deleteOne({ _id: id });
            if (data.deletedCount === 0) {
                return res.status(404).json({ message: "Livro não encontrado" });
            }
            return res.status(200).json({ message: "Livro deletado com sucesso" });
        } catch (err) {
            res.status(500).json({
                message: `Erro ao deletar livro: ${id}`,
                error: err.message
            });
        }
    };

    static async editar(req, res) {
        const id = req.params.id;
        const { titulo, editora, paginas, preco } = req.body;
        try {
            const data = await Livro.findByIdAndUpdate(
                id,
                { titulo, editora, paginas, preco },
                { new: true }
            );
            if (!data) {
                return res.status(404).json({ message: "Livro não encontrado" });
            }
            return res.status(200).json(data);
        } catch (err) {
            res.status(500).json({
                message: `Erro ao atualizar livro: ${id}`,
                error: err.message
            });
        }
    }

    static async listarPorEditora(req, res) {
        const editora = req.query.editora;
        try {
            const livrosPorEditora = await Livro.find({ "editora.nome": editora });
            return res.status(200).json(livrosPorEditora);
        } catch (err) {
            res.status(500).json({
                message: "Erro ao listar livros",
                error: err.message
            });
        }
    };
};
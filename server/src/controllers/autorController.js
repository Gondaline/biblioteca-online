import Autor from "../models/Autor.js";

export default class AutorController {

    static async listar(req, res) {
        try {
            const data = await Autor.find()
                .populate("autor")
                .populate("editora")
                .exec();
            return res.status(200).json(data);
        } catch (err) {
            res.status(500).json({
                message: "Erro ao consultar autores",
                error: err.message,
            });
        }
    };

    static async listarID(req, res) {
        try {
            const id = req.params.id;
            const data = await Autor.findById(id)
                .populate("autor")
                .populate("editora");
            return res.status(200).json(data);
        } catch (err) {
            res.status(500).json({
                message: "Erro ao consultar autor",
                error: err.message,
            });
        }
    };

    static async adicionar(req, res) {
        const { nome, nacionalidade, qtd_livros_publicados } = req.body;
        try {
            const data = await Autor.create({
                nome,
                nacionalidade,
                qtd_livros_publicados
            });
            return res.status(201).json({
                message: "Autor criado com sucesso",
                autor: data
            });
        } catch (err) {
            res.status(500).json({
                message: "Erro ao criar autor",
                error: err.message,
            });
        }
    };

    static async deletar(req, res) {
        const id = req.params.id;
        try {
            const data = await Autor.deleteOne({ _id: id });
            if (data.deletedCount === 0) {
                return res.status(404).json({ message: "Autor não encontrado" });
            }
            return res.status(200).json({ message: "Autor deletado com sucesso" });
        } catch (err) {
            res.status(500).json({
                message: `Erro ao deletar autor: ${id}`,
                error: err.message
            });
        }
    };

    static async editar(req, res) {
        const id = req.params.id;
        const { nome, nacionalidade, qtd_livros_publicados } = req.body;
        try {
            const data = await Autor.findByIdAndUpdate(
                id,
                { nome, nacionalidade, qtd_livros_publicados },
                { new: true });
            if (!data) {
                return res.status(404).json({ message: "Autor não encontrado" });
            }
            return res.status(200).json(data);
        } catch (err) {
            res.status(500).json({
                message: `Erro ao editar autor: ${id}`,
                error: err.message
            });
        }
    };
};
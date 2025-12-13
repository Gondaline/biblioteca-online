import Editora from "../models/Editora.js";

export default class EditoraController {

    static async listar(req, res) {
        try {
            const data = await Editora.find({});
            return res.status(200).json(data);
        } catch (err) {
            res.status(500).json({
                message: "Erro ao consultar editoras",
                error: err.message,
            });
        }
    };

    static async listarID(req, res) {
        try {
            const id = req.params.id;
            const data = await Editora.findById({ _id: id });
            return res.status(200).json(data)
        } catch (err) {
            res.status(500).json({
                message: "Erro ao consultar editora",
                error: err.message,
            });
        }
    };

    static async adicionar(req, res) {
        const { nome, pais, anoFuncao } = req.body
        try {
            const data = await Editora.create({
                nome,
                pais,
                anoFuncao
            })
            return res.status(201).json({
                message: "Autor criado com sucesso",
                editora: data
            });
        } catch (err) {
            res.status(500).json({
                message: "Erro ao criar editora",
                error: err.message
            });
        }
    };

    static async deletar(req, res) {
        const id = req.params.id;
        try {
            const data = await Editora.deleteOne({ _id: id });
            if (data.deletedCount === 0) {
                return res.status(404).json({ message: "Editora não encontrada" });
            }
            return res.status(200).json({ message: "Editora deletada com sucesso" });
        } catch (err) {
            res.status(500).json({
                message: `Erro ao deletar editora: ${id}`,
                error: err.message
            });
        }
    };

    static async editar(req, res) {
        const id = req.params.id;
        const { nome, pais, anoFuncao } = req.body;
        try {
            const data = await Editora.findByIdAndUpdate(
                id,
                { nome, pais, anoFuncao },
                { new: true }
            );
            if (!data) {
                return res.status(404).json({ message: "Editora não encontrada" });
            }
            return res.status(200).json(data);
        } catch (err) {
            res.status(500).json({
                message: `Erro ao atualizar editora: ${id}`,
                error: err.message
            });
        }
    };
};
import Editora from "../models/Editora.js";

export default class EditoraController {

    static async listar(req, res, next) {
        try {
            const data = await Editora.find();

            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };

    static async listarID(req, res, next) {
        try {
            const id = req.params.id;
            const data = await Editora.findById(id);
            if (!data) return res.status(404).json({ message: "ID da Editora não localizada" });

            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };

    static async adicionar(req, res, next) {
        const { nome, pais, anoFuncao } = req.body;
        try {
            const data = await Editora.create({
                nome,
                pais,
                anoFuncao
            });
            res.status(201).json({
                message: "Editora criada com sucesso",
                editora: data
            });
        } catch (err) {
            next(err);
        }
    };

    static async deletar(req, res, next) {
        try {
            const id = req.params.id;
            const data = await Editora.deleteOne({ _id: id });
            if (data.deletedCount === 0) return res.status(404).json({ message: "Editora não encontrada" });

            res.status(200).json({ message: "Editora deletada com sucesso" });
        } catch (err) {
            next(err);
        }
    };

    static async editar(req, res, next) {
        const id = req.params.id;
        const { nome, pais, anoFuncao } = req.body;
        try {
            const data = await Editora.findByIdAndUpdate(
                id,
                { nome, pais, anoFuncao },
                { new: true }
            );
            if (!data) return res.status(404).json({ message: "Editora não encontrada" });

            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };
};
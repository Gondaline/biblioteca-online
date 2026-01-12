import NaoEncontrado from "../erros/NaoEncontrado.js";
import Autor from "../models/Autor.js";

export default class AutorController {

    static async listar(req, res, next) {
        try {
            const data = await Autor.find();
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };

    static async listarID(req, res, next) {
        try {
            const id = req.params.id;
            const data = await Autor.findById(id);

            if (!data) {
                next(new NaoEncontrado("ID do Autor não localizado"));
            }

            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };

    static async adicionar(req, res, next) {
        try {
            const { nome, nacionalidade, qtd_livros_publicados } = req.body;
            const data = await Autor.create({
                nome,
                nacionalidade,
                qtd_livros_publicados
            });

            res.status(201).json({
                message: "Autor criado com sucesso",
                autor: data
            });
        } catch (err) {
            next(err);
        }
    };

    static async deletar(req, res, next) {
        try {
            const id = req.params.id;
            const data = await Autor.deleteOne({ _id: id });

            if (data.deletedCount === 0) {
                next(new NaoEncontrado("Autor não encontrado"));
            }

            res.status(200).json({ message: "Autor deletado com sucesso" });
        } catch (err) {
            next(err);
        }
    };

    static async editar(req, res, next) {
        try {
            const id = req.params.id;
            const { nome, nacionalidade, qtd_livros_publicados } = req.body;
            const data = await Autor.findByIdAndUpdate(
                id,
                { nome, nacionalidade, qtd_livros_publicados },
                { new: true });

            if (!data) {
                next(new NaoEncontrado("Autor não encontrado"));
            }

            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };
};
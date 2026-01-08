import Livro from "../models/Livro.js";
import Autor from "../models/Autor.js";
import Editora from "../models/Editora.js";
import validarObjectId from "../auxilies/validarObjectId.js";

export default class LivroController {

    static async listar(req, res, next) {
        try {
            const data = await Livro.find()
                .populate("autor")
                .populate("editora");

            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };

    static async listarPorID(req, res, next) {
        try {
            const id = req.params.id;
            if (!validarObjectId(id)) return res.status(400).json({ message: "ID inválido" });

            const data = await Livro.findById(id)
                .populate("autor")
                .populate("editora");
            if (!data) return res.status(404).json({ message: "Livro não encontrado" });

            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    };

    static async adicionar(req, res, next) {
        try {
            const { titulo, editora, paginas, preco, autor } = req.body;

            if (!validarObjectId(autor) || !validarObjectId(editora)) return res.status(400).json({ message: "Autor ou Editora inválidos" });

            const autorEncontrado = await Autor.findById(autor);
            const editoraEncontrada = await Editora.findById(editora);

            if (!autorEncontrado) return res.status(404).send({ message: "Autor não encontrado" });
            if (!editoraEncontrada) return res.status(404).send({ message: "Editora não encontrada" });

            const livroCriado = await Livro.create({
                titulo,
                editora,
                paginas,
                preco,
                autor
            });

            res.status(201).json({
                message: "Livro criado com sucesso",
                livro: livroCriado,
            });
        } catch (err) {
            next(err);
        }
    };

    static async deletar(req, res, next) {
        try {
            const id = req.params.id;
            if (!validarObjectId(id)) return res.status(400).json({ message: "ID inválido" });

            const deleted = await Livro.findByIdAndDelete(id);
            if (!deleted) return res.status(404).json({ message: "Livro não encontrado" });

            res.status(200).json({ message: "Livro deletado com sucesso" });
        } catch (err) {
            next(err);
        }
    };

    static async editar(req, res, next) {
        try {
            const update = {};
            const { titulo, editora, paginas, preco } = req.body;
            const id = req.params.id;

            if (!validarObjectId(id)) return res.status(400).json({ message: "ID inválido" });
            if (editora && !validarObjectId(editora)) return res.status(400).json({ message: "ID de editora inválido" });

            if (titulo !== undefined) update.titulo = titulo;
            if (editora !== undefined) update.editora = editora;
            if (paginas !== undefined) update.paginas = paginas;
            if (preco !== undefined) update.preco = preco;

            const data = await Livro.findByIdAndUpdate(
                id,
                update,
                { new: true }
            );
            if (!data) return res.status(404).json({ message: "Livro não encontrado" });

            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async listarPorEditora(req, res, next) {
        try {
            const editoraId = req.query.editora;
            if (!editoraId) return res.status(400).json({ message: "Parâmetro editora é obrigatório" });

            const livrosPorEditora = await Livro.find({ editora: editoraId })
                .populate("autor")
                .populate("editora");

            res.status(200).json(livrosPorEditora);
        } catch (err) {
            next(err);
        }
    };
};
import { Router } from "express";
import Livro from "../models/Livro.js";

const router = Router();

router.get("/livros", async (req, res) => {
  try {
    const data = await Livro.find({});
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: "Erro ao consultar livros",
      error: err.message,
    });
  }
});

router.post("/livros", async (req, res) => {
  const { titulo, editora, paginas, preco } = req.body
  try {
    const data = await Livro.create({
      titulo,
      editora,
      paginas,
      preco
    })
    return res.status(201).json(data)
  } catch (err) {
    res.status(500).json({
      message: "Erro ao criar livro",
      error: err.message,
    });
  }
});

router.delete("/livros/:id", async (req, res) => {
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
});

router.put("/livros/:id", async (req, res) => {
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
});

export default router;
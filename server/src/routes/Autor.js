import { Router } from "express";
import Autor from "../models/Autor.js";

const router = Router();

router.get("/autores", async (req, res) => {
  try {
    const data = await Autor.find({});
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: "Erro ao consultar autores",
      error: err.message,
    });
  }
});

router.post("/autores", async (req, res) => {
  const { nome, nacionalidade, qtd_livros_publicados } = req.body
  try {
    const data = await Autor.create({
      nome,
      nacionalidade,
      qtd_livros_publicados
    })
    return res.status(201).json(data)
  } catch (err) {
    res.status(500).json({
      message: "Erro ao criar autor",
      error: err.message,
    });
  }
});

router.delete("/autores/:id", async (req, res) => {
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
});

router.put("/autores/:id", async (req, res) => {
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
});

export default router;
import { Router } from "express";
import Editora from "../models/Editora.js";

const router = Router();

router.get("/editoras", async (req, res) => {
  try {
    const data = await Editora.find({});
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: "Erro ao consultar editoras",
      error: err.message,
    });
  }
});

router.post("/editoras", async (req, res) => {
  const { nome, pais, anoFuncao } = req.body
  try {
    const data = await Editora.create({
      nome,
      pais,
      anoFuncao
    })
    return res.status(201).json(data)
  } catch (err) {
    res.status(500).json({
      message: "Erro ao criar editora",
      error: err.message
    });
  }
});

router.delete("/editoras/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Editora.deleteOne({ _id: id });
    if (data.deletedCount === 0) {
      return res.status(404).json({ message: "Editora não encontrada" });
    }
    return res.status(200).json({ message: "Editora deletada com sucesso" });
  } catch (err) {
    res.status(500).json({
      message:  `Erro ao deletar editora: ${id}`,
      error: err.message
    });
  }
});

router.put("/editoras/:id", async (req, res) => {
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
});

export default router;
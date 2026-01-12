import { Router } from "express";
import LivroController from "../controllers/livroController.js";

const router = Router();

router
    .get("/", LivroController.listar)
    .get("/busca", LivroController.listarPorEditora)
    .get("/:id", LivroController.listarPorID)
    .post("/", LivroController.adicionar)
    .put("/:id", LivroController.editar)
    .delete("/:id", LivroController.deletar)

export default router;
import { Router } from "express";
import LivroController from "../controllers/livroController.js";

const router = Router();

router.get("/", LivroController.listar);
router.get("/busca", LivroController.listarPorEditora);
router.get("/:id", LivroController.listarPorID);
router.post("/", LivroController.adicionar);
router.delete("/:id", LivroController.deletar);
router.put("/:id", LivroController.editar);

export default router;
import { Router } from "express";
import LivroController from "../controllers/livroController.js"

const router = Router();

router.get("/", LivroController.listar);
router.get("/:id", LivroController.listarID);
router.post("/", LivroController.adicionar);
router.delete("/:id", LivroController.deletar);
router.put("/:id", LivroController.editar);

export default router;
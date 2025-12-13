import { Router } from "express";
import EditoraController from "../controllers/editoraController.js"

const router = Router();

router.get("/", EditoraController.listar);
router.get("/:id", EditoraController.listarID);
router.post("/", EditoraController.adicionar);
router.delete("/:id", EditoraController.deletar);
router.put("/:id", EditoraController.editar);

export default router;
import { Router } from "express";
import EditoraController from "../controllers/editoraController.js";

const router = Router();

router
    .get("/", EditoraController.listar)
    .get("/:id", EditoraController.listarID)
    .post("/", EditoraController.adicionar)
    .put("/:id", EditoraController.editar)
    .delete("/:id", EditoraController.deletar);

export default router;
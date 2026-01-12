import { Router } from "express";
import AutorController from "../controllers/autorController.js";

const router = Router();

router
    .get("/", AutorController.listar)
    .get("/:id", AutorController.listarID)
    .post("/", AutorController.adicionar)
    .put("/:id", AutorController.editar)
    .delete("/:id", AutorController.deletar);

export default router;
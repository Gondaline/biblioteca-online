import { Router } from "express";
import AutorController from "../controllers/autorController.js";

const router = Router();

router.get("/", AutorController.listar);
router.get("/:id", AutorController.listarID);
router.post("/", AutorController.adicionar);
router.delete("/:id", AutorController.deletar);
router.put("/:id", AutorController.editar);

export default router;
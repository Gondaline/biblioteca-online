import express from "express";

import autoresRoutes from "./src/routes/Autor.js";
import livrosRoutes from "./src/routes/Livro.js";
import editorasRoutes from "./src/routes/Editora.js";

const app = express();

app.use(express.json());

app.use(autoresRoutes);
app.use(livrosRoutes);
app.use(editorasRoutes);

export default app;
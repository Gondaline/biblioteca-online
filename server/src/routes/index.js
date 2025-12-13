import express from "express";
import Autor from "../routes/Autor.js";
import Editora from "../routes/Editora.js";
import Livros from "../routes/Livro.js";

const routes = (app) => {
    app.use(express.json());
    app.route("/").get((req, res) => res.status(200).send("Curso de Node.js"));
    app.use("/autores", Autor);
    app.use("/editoras", Editora);
    app.use("/livros", Livros);
};

export default routes;
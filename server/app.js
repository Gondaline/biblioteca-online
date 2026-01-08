import express from "express";
import routes from "./src/routes/index.js";
import mongoose from "mongoose";

const app = express();
routes(app);

app.use((erro, req, res, next) => {

    if (erro instanceof mongoose.Error.CastError) {
        res.status(400).json({
            message: "Um ou mais dados fornecidos estão incorretos"
        })
    } else {
        res.status(500).json({
            message: "Erro interno do servidor",
            error: erro.message
        });
    }
})

export default app;
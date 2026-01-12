import express from "express";
import routes from "./src/routes/index.js";
import manipuladorErros from "./src/middlewares/manipuladorErros.js";
import manipulador404 from "./src/middlewares/manipulador404.js";

const app = express();
routes(app);

app.use(manipulador404);

app.use(manipuladorErros);

export default app;
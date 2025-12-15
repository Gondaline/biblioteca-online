import "dotenv/config";
import connectDb from "./src/config/dbConnect.js";
import app from "./app.js";

const PORT = process.env.PORT || 3000;
await connectDb();

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
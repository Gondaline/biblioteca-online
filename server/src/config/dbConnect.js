import mongoose from "mongoose";

export default async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDb conectado!");
        return mongoose.connection;
    } catch (err) {
        console.log("Erro ao conectar no MongoDB:", err.message);
    }
};
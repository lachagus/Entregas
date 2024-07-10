
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("");
        console.log("Mongo Conectado");

    } catch (error) {
        console.log("Error al conectar Mongo");
    }
}
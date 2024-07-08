
import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://admin:admin1985@e-commerce.itg6fmb.mongodb.net/ecommerce");
        console.log("Mongo Conectado");

    } catch (error) {
        console.log("Error al conectar Mongo");
    }
}
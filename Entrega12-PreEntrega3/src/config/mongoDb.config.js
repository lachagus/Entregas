import mongoose from "mongoose";
import envs from "./env.config.js";

export const connectMongoDB = async () => {
    try {
        //Conexión a la BD a través del archivo de conf. de var. de entorno. Es más seguro porque no se sube a git
        mongoose.connect(envs.MONGO_URL);
        console.log("Mondo DB Conectado");
        
    } catch (error) {
        console.log(error);
    }
}
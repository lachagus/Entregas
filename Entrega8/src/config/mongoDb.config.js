import mongoose, { connect } from "mongoose";

const urlDb = "mongodb+srv://admin:admin1985@e-commerce.itg6fmb.mongodb.net/ecommerce";

export const connectMongoDB = async () => {
    try {
        //Conexión a la BD
        mongoose.connect(urlDb);
        console.log("Mondo DB Conectado");
    } catch (error) {
        console.log(error);
    }
}
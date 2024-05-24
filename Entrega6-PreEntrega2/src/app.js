import express from "express";
import router from "./routes/index.js";

//Conexión de la BD en al app ppal.
import { connectMongoDB } from "./config/mongoDb.config.js";

//Inicializa
connectMongoDB();

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.listen(8080, () => {
    console.log("Escuchando servidor en el puerto 8080");
})
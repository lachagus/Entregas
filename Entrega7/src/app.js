import express from "express";
import router from "./routes/index.js";
import { connectMongoDB } from "./config/mongoDb.config.js";

//Paquetes Mongo Atlas para la sesión 
import session from "express-session";
import MongoStore from "connect-mongo";

//Inicializa
connectMongoDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuración de la session
app.use(session({

    //Se crea una sesión para Mongo
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://admin:admin1985@e-commerce.itg6fmb.mongodb.net/ecommerce",
        ttl: 15
    }),
    secret: "Adivinalo",
    resave: true

}));

app.use("/api", router);

app.listen(8080, () => {
    console.log("Escuchando servidor en el puerto 8080");
})
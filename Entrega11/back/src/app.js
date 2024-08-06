import express from "express";
import router from "./routes/index.js";
import { connectMongoDB } from "./config/mongoDb.config.js";

//Paquetes Mongo Atlas para la sesión 
import session from "express-session";
import MongoStore from "connect-mongo";

import passport from "passport";
import inicializePassport from "./config/passport.config.js";
import cookieParser from "cookie-parser";
import envs from "./config/env.config.js";

//Inicializa
connectMongoDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Conf. del middleware del cookie-parser. Unifico código con el de session.
app.use(cookieParser(envs.CODE_SECRET));

//Configuración de la session
app.use(session({

    //Se crea una sesión para Mongo
    store: MongoStore.create({
        mongoUrl: envs.MONGO_URL,
        ttl: 15
    }),
    secret: envs.CODE_SECRET,
    resave: true,
    saveUninitialized: true
}));

//Middlewares de passport para inicializar
app.use(passport.initialize());
app.use(passport.session());
inicializePassport();

app.use("/api", router);

app.listen(envs.PORT, () => {
    console.log(`Escuchando servidor en el puerto ${envs.PORT}`);
});

import express from "express";
import handlebars from "express-handlebars";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";

import _dirname from "./dirname.js";
import viewRoutes from "./routes/views.routes.js";
import { connectDB } from "./config/mongoDb.config.js";
import apiRoutes from "./routes/index.routes.js"
import { initializePassport } from "./config/passport.config.js";

//Inicializa DB
connectDB()

const PORT = 8080;
const app = express();

//Configuración de middelwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", handlebars.engine());
app.set("views", _dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static("public"));

//Conf. del middleware del cookie-parser
app.use(cookieParser());

//app.use(cookieParser("secret")); --> mio

//Configuración de la session
app.use(
    session({
        secret: "Adivinalo",
        resave: true,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());
initializePassport();

app.use("/", viewRoutes);
app.use("/api", apiRoutes);

app.listen(PORT, () => {
    console.log(`Escuchando servidor en el puerto ${PORT}`);
});
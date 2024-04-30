//Para usar módulos imports
//Se agrega "type": "module", debajo de "main" en el archivo package.jason
import express from "express";

//Configuramos el router principal
import router from "./routes/index.js";

//Ejecuta express
const app = express();

//Inicialización de Middlewares

//Este permite leer y devolver archivos, expresiones en json
app.use(express.json());

//Permite leer archivos por medio de postman
app.use(express.urlencoded({ extended: true }));

//Lo configuramos con el prefijo de API ya que vamos a utilizar todo así. Va a tener todos los routers
app.use("/api", router);

app.listen(8080, () => {
    console.log("Escuchando servidor en el puerto 8080");
})
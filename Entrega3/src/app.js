//Cuando usa módulos imports no se usa esto, sino el import de abajo
//const express = require("express");

//Para usar módulos imports
//Se agrega "type": "module", debajo de "main" en el archivo package.jason
import express from "express";

//El productManager es el alias
import productManager from "./productManager.js";

//Ejecuta express
const app = express();

//Inicialización de Middlewares

//Este permite leer y devolver archivos, expresiones en json
app.use(express.json());

//Permite leer archivos por medio de postman
app.use(express.urlencoded({ extended: true }));

//Configuramos dos métodos
//Req = request --> la info que recibimos dentro del servidor, del cliente al servidor
//Res = response --> es la respuesta que se manda desde el servido y espera el cliente (postman en este caso), sino queda esperando por algo
app.get("/products", async (req, res) => {

    try {
        
        //Desestructura la query que venga con el valor del límite
        const { limit } = req.query;

        //Se le pasa el límite que se recibe por query
        const products = await productManager.getProducts(limit);

        res.status(200).json(products);

    } catch (error) {
        console.log(error);
    }

})

app.get("/products/:pid", async (req, res) => {

    try {
        
        //Lee por parámetros el pid (product id) que se recibe
        const { pid } = req.params;

        //Se determine y busca el producto id que se está recibiendo
        //Se hace de manera individual ya que se está buscando sólo un producto
        //Se tiene que parsear el pid recibido porque siempre llega como string: +pid el + transforma en nro.
        const product = await productManager.getProductsById(+pid);

        //Express por defecto devuelve 200 pero lo configuramos igual para que se sepa que se manda el 200
        res.status(200).json(product);

    } catch (error) {
        console.log(error);
    }
    
})

app.listen(8080, () => {
    console.log("Escuchando servidor en el puerto 8080");
})
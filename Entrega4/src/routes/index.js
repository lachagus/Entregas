//Importamos router de express
import { Router } from "express";

//Se imprtan las rutas también
import productsRouters from "./products.routes.js";
import cartsRouters from "./carts.routes.js";

const router = Router();

//Indexamos los endpoints, se confuguran
//En este están todas las rutas de los productos
router.use("/products", productsRouters);

//En este están todas las rutas de los carts
router.use("/products", cartsRouters);

export default router;
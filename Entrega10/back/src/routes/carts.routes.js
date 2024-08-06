//Capa de las rutas del carrito. Desde acá se empieza cuando el cliente manda una petición. Luego se va a la capa de controladores.
import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";

//Capa de rutas. Llama a la capa de carts.controllers para que realice todas las operaciones
const router = Router();

router.post("/", authorization("user"), cartsController.createCart);

router.get("/:cid", passportCall("jwt"), authorization("user"), cartsController.getCartById);

router.put("/:cid", passportCall("jwt"), authorization("user"), cartsController.updateCart);

router.delete("/:cid", passportCall("jwt"), authorization("user"), cartsController.deleteAllProductsInCart);

router.post("/:cid/product/:pid", passportCall("jwt"), authorization("user"), cartsController.addProductToCart);

router.put("/:cid/product/:pid",  passportCall("jwt"), authorization("user"), cartsController.updateQuantityProductInCart);

router.delete("/:cid/product/:pid", passportCall("jwt"), authorization("user"), cartsController.deleteProductInCart);

export default router;
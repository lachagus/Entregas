//Capa de las rutas del carrito.
//Desde acá se empieza cuando el cliente manda una petición. Luego se va a la capa de controladores.
import { Router } from "express";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import { checkProductAndCart } from "../middlewares/checkProductAndCart.middleware.js";
import cartsControllers from "../controllers/carts.controllers.js";
import { isUserCart } from "../middlewares/isUserCart.js";

//Capa de rutas. Llama a la capa de carts.controllers para que realice todas las operaciones
const router = Router();

router.post("/", authorization("user"), cartsControllers.createCart);

router.get("/:cid", passportCall("jwt"), authorization("user"), cartsControllers.getCartById);

router.delete("/:cid", passportCall("jwt"), authorization("user"), cartsControllers.deleteAllProductsInCart);

router.post("/:cid/product/:pid", passportCall("jwt"), authorization("user"), checkProductAndCart, isUserCart, cartsControllers.addProductToCart);

router.put("/:cid/product/:pid",  passportCall("jwt"), authorization("user"), checkProductAndCart, cartsControllers.updateQuantityProductInCart);

router.delete("/:cid/product/:pid", passportCall("jwt"), authorization("user"), checkProductAndCart, cartsControllers.deleteProductInCart);

router.get("/:cid/purchase", passportCall("jwt"), authorization("user"), cartsControllers.purchaseCart);

export default router;
//Importamos router de express
import { Router } from "express";
//import cartManager from "../managers/cartManager.js";

const router = Router();

//Endpoint POST
router.post("/", async (req, res) => {

    try {

        const cart = await cartManager.createCart();

        //Muestra el carrito creado
        res.status(201).json(cart);


    } catch (error) {
        console.log(error);
    }
});

//Endpoint POST con dos parámetros
router.post("/:cid/product/:pid ", async (req, res) => {

    try {
        const { cid, pid } = req.params;
        const cart = await cartManager.addProductToCart(+cid, +pid);

        //Muestra el carrito creado
        res.status(201).json(cart);

    } catch (error) {
        console.log(error);
    }
});

//Endpoint GET para todos

router.get("/", async (req, res) => {

    try {

        const carts = await cartManager.getCarts();

        res.status(200).json(carts);

    } catch (error) {
        console.log(error);
        //res.status(400).json({error: error.message});
    }

})

//Endpoint GET para uno
router.get("/:cid", async (req, res) => {

    try {

        const { cid } = req.params;
        const cart = await cartManager.getCartById(+cid);

        res.status(200).json(cart);

    } catch (error) {
        console.log(error);
    }
});

export default router;
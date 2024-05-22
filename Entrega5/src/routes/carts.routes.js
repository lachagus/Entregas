import { Router } from "express";
import cartDao from "../dao/mongoDao/cart.dao.js";

const router = Router();

router.post("/", async (req, res) => {

    try {
        const cart = await cartDao.create();
        res.status(201).json({satatus: "success", playload: cart});

    } catch (error) {
        console.log(error);
    }
});

router.post("/:cid/product/:pid", async (req, res) => {

    try {
        const { cid, pid } = req.params;
        const cart = await cartDao.addProductToCart(cid, pid);

        if (cart.product == false) return res.status(404).json({status: "Error", msg: `No se encontró el producto con el ID ${pid}`});

        if (cart.cart == false) return res.status(404).json({status: "Error", msg: `No se encontró el carrito con el ID ${cid}`});

        //Muestra el carrito creado
        res.status(201).json({satatus: "success", playload: cart});

    } catch (error) {
        console.log(error);
    }
});

router.get("/:cid", async (req, res) => {

    try {
        const { cid } = req.params;
        const cart = await cartDao.getById(cid);
        if(!cart) return res.status(404).json({status: "Error", msg: `No se encontró el carrito con el ID ${cid}`});

        res.status(200).json(cart);

    } catch (error) {
        console.log(error);
    }
});

export default router;
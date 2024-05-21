import { Router } from "express";

//No se usa más el File System, se usa Mongo
import productDao from "../dao/mongoDao/product.dao.js";

const router = Router();
router.get("/", async (req, res) => {

    try {
        //Desestructura la query que venga con el valor del límite
        //const { limit } = req.query;
        //Se le pasa el límite que se recibe por query
        //const products = await productManager.getProducts(limit);

        const products = await productDao.getAll();

        res.status(200).json({ status: "success", payload: products });

    } catch (error) {
        console.log(error);
        //res.status(400).json({error: error.message});
    }

})

router.get("/:pid", async (req, res) => {

    try {
        const { pid } = req.params;

        //Acá no se parsea el ID porque en mongo es alfanummérico, es un string
        const product = await productDao.getById(pid);

        //Manejo de errores
        if (!product) return res.status(404).json({ status: "Error", msg: `Producto con el ID ${pid} no encontrado` });

        res.status(200).json({ status: "success", payload: product });

    } catch (error) {
        console.log(error);
    }

});

router.post("/", async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await productDao.create(product);
        res.status(201).json({ status: "success", payload: newProduct });

    } catch (error) {
        console.log(error);
    }
});

router.put("/:pid", async (req, res) => {

    try {
        const { pid } = req.params;
        const productData = req.body;
        const updateProduct = await productDao.update(pid, productData);

        if (!updateProduct) return res.status(404).json({ status: "Error", msg: `Producto con el ID ${pid} no encontrado` });

        res.status(200).json({ status: "success", payload: updateProduct });

    } catch (error) {
        console.log(error);
    }
});

router.delete("/:pid", async (req, res) => {

    try {
        const { pid } = req.params;

        await productDao.deleteOne(pid);

        //Se guarda la respuesta desde el DAO
        const product = await productDao.deleteOne(pid);
        if(!product) return res.status(404).json({ status: "Error", msg: `Producto con el ID ${pid} no encontrado` });

        res.status(200).json({ status: "success", payload: "Producto eliminado" });

    } catch (error) {
        console.log(error);
    }

});

export default router;
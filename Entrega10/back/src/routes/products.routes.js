import { Router } from "express";
import productDao from "../dao/mongoDao/product.dao.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import { productDataValidator } from "../validators/productData.validator.js";

const router = Router();
router.get("/", async (req, res) => {
    try {
        //Query que pide el desafío.
        //Category y status son los filtros. Son opcionales.
        const { limit, page, sort, category, status } = req.query;

        //Se le pasa el límite que se recibe por query
        const options = {
            limit: limit || 10,
            page: page || 1,
            sort: {
                //Si es asc --> 1 orden ascendente, sino -1 es descendente
                price: sort === "asc" ? 1 : -1,
            },
            lean: true
        };

        //Filtro status
        if (status) {
            //En la búsqueda se pasa el status
            //Se podría poner sólo {status} porque para JS si la propiedad y la clave y el valor son = se llaman iguales, se puede poner así solo
            const products = await productDao.getAll({ status: status }, options);
            return res.status(200).json({ products });
        };

        //Filtro category
        if (category) {
            //En la búsqueda se pasa el status
            //Se podría poner sólo {status} porque para JS si la propiedad y la clave y el valor son = se llaman iguales, se puede poner así solo
            const products = await productDao.getAll({ category: category }, options);
            return res.status(200).json({ products });
        };

        //Si no se cumple ninguna de las otras dos opciones con filtros, se obtienen todos los productos
        const products = await productDao.getAll({}, options);

        //res.status(200).json({ status: "success", payload: products });

        res.status(200).json({ status: "success", products });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Error interno del servidor" });
    }
});

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
        res.status(500).json({ status: "error", msg: "Error interno del servidor" });
    }
});

//Sólo pueden crear los admin
router.post("/", passportCall("jwt"), authorization("admin"), productDataValidator, async (req, res) => {
//router.post("/", passportCall("jwt"), authorization("admin"), async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await productDao.create(product);
        res.status(201).json({ status: "success", payload: newProduct });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Error interno del servidor" });
    }
});

//Sólo pueden actualizar los admin
router.put("/:pid", passportCall("jwt"), authorization("admin"), async (req, res) => {
    try {
        const { pid } = req.params;
        const productData = req.body;
        const updateProduct = await productDao.update(pid, productData);

        if (!updateProduct) return res.status(404).json({ status: "Error", msg: `Producto con el ID ${pid} no encontrado` });
        res.status(200).json({ status: "success", payload: updateProduct });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Error interno del servidor" });
    }
});

//Sólo pueden eliminar los admin
router.delete("/:pid", passportCall("jwt"), authorization("admin"),async (req, res) => {
    try {
        const { pid } = req.params;
        
        //Se guarda la respuesta desde el DAO
        const product = await productDao.deleteOne(pid);

        if (!product) return res.status(404).json({ status: "Error", msg: `Producto con el ID ${pid} no encontrado` });
        res.status(200).json({ status: "success", payload: "Producto eliminado" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Error interno del servidor" });
    }
});

export default router;
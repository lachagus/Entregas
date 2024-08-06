//Capa Controlador de products
import productsServices from "../services/products.services.js";

const getAllProducts = async (req, res) => {
    try {
        const { limit, page, sort, category, status } = req.query;
        const options = {
            limit: limit || 10,
            page: page || 1,
            sort: {
                price: sort === "asc" ? 1 : -1,
            },
            lean: true
        };
        //Filtro status
        if (status) {
            const products = await productsServices.getAllProducts({ status: status }, options);
            return res.status(200).json({ status: "succes", products });
        };
        //Filtro category
        if (category) {
            const products = await productsServices.getAllProducts({ category: category }, options);
            return res.status(200).json({ status: "succes", products });
        };
        //Si no se cumple ninguna de las otras dos opciones con filtros, se obtienen todos los productos
        const products = await productsServices.getAllProducts({}, options);
        res.status(200).json({ status: "success", products });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Error interno del servidor." });
    }
};

const getProductById = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productsServices.getProductById(pid);

        if (!product) return res.status(404).json({ status: "Error", msg: `Producto con el ID ${pid} no encontrado` });
        res.status(200).json({ status: "success", payload: product });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Error interno del servidor." });
    }
};

const createProduct = async (req, res) => {
    try {
        const product = req.body;
        const newProduct = await productsServices.createProduct(product);
        res.status(201).json({ status: "success", payload: newProduct });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Error interno del servidor." });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const productData = req.body;
        const updateProduct = await productsServices.updateProduct(pid, productData);

        if (!updateProduct) return res.status(404).json({ status: "Error", msg: `Producto con el ID ${pid} no encontrado` });
        res.status(200).json({ status: "success", payload: updateProduct });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Error interno del servidor." });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productsServices.deleteProduct(pid);

        if (!product) return res.status(404).json({ status: "Error", msg: `Producto con el ID ${pid} no encontrado` });
        res.status(200).json({ status: "success", payload: "Producto eliminado." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "error", msg: "Error interno del servidor." });
    }
};

export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
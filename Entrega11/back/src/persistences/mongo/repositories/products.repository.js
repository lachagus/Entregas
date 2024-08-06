//Capa de persistencia del producto. Es la que se comunica con la BD. 
//Se migró del DAO.
//En esta capa se pueden agregar más métdos o funcines además de las CRUD, para esto sirve, para más lógica.
import { productModel } from "../models/product.model.js";

const getAllProducts = async (query, options) => {
    const products = await productModel.paginate(query, options);
    return products;
};

const getProductById = async (id) => {
    const product = await productModel.findById(id);
    return product;
};

const createProduct = async (data) => {
    const product = await productModel.create(data);
    return product;
};

const updateProduct = async (id, data) => {
    const product = await productModel.findByIdAndUpdate(id, data, { new: true });
    return product;
};

const deleteProduct = async (id) => {
    const product = await productModel.deleteOne({ _id: id });
    if (product.deletedCount === 0) return false;
    return true;
};

export default {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
import { productResponseDto } from "../dto/product-response.dto.js";
import productRepository from "../persistences/mongo/repositories/products.repository.js";

const getAllProducts = async (query, options) => {
    const products = await productRepository.getAllProducts(query, options);
    return products;
};

const getProductById = async (id) => {
    const productData = await productRepository.getProductById(id);
    const product = productResponseDto(productData);
    return product;
};

const createProduct = async (data) => {
    const product = await productRepository.createProduct(data);
    return product;
};

const updateProduct = async (id, data) => {
    const product = await productRepository.updateProduct(id, data);
    return product;
};

const deleteProduct = async (id) => {
    const product = await productRepository.deleteProduct(id);
    return product;
};

export default{
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
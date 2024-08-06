//Capa de negocios. 
//Va luego de la capa controller. 
//Es una entermedia entre el controlador a la capa de persistencia.
//La capa de ss. es la que se comunica con el Dao o repository
import cartsRepository from "../persistences/mongo/repositories/carts.repository.js";
import productsRepository from "../persistences/mongo/repositories/products.repository.js";

const createCart = async () => {
    return await cartsRepository.createCart();
};

const addProductToCart = async (cid, pid) => {
    return await cartsRepository.addProductToCart(cid, pid);
};

const updateQuantityProductInCart = async (cid, pid, quantity) => {
    return await cartsRepository.updateQuantityProductInCart(cid, pid, quantity);
};

const deleteProductInCart = async (cid, pid) => {
    return await cartsRepository.deleteProductInCart(cid, pid);
};

const getCartById = async (id) => {
    return await cartsRepository.getById(id);
};

const deleteAllProductsInCart = async (cid) => {
    return await cartsRepository.deleteAllProductsInCart(cid);
};

const purchaseCart = async (cid) => {
    const cart = await cartsRepository.getById(cid);
    let total = 0;
    const products = [];
    //Por cada prooducto del carrito hace la suma y calcula el total
    for (const product of cart.products) {
        const prod = await productsRepository.getProductById(product.product);
        if (prod.stock >= product.quantity) {
            total += prod.price * product.quantity;
        } else {
            products.push(product);
        };

        // Modifica los productos del carrito
        await cartsRepository.updateCart(cid, products);
    };
    return total;
};

export default {
    createCart,
    addProductToCart,
    updateQuantityProductInCart,
    deleteProductInCart,
    getCartById,
    deleteAllProductsInCart,
    purchaseCart
};

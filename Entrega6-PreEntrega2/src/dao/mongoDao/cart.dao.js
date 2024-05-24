import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";

const getById = async (id) => {
    const cart = await cartModel.findById(id);
    return cart;
};

const create = async (data) => {
    const cart = await cartModel.create(data);
    return cart;
};

//Agrega un producto al carrito
//Recibe el id del carrito y el id del producto
//Primero se debe buscar el producto. Se debe insertar el product model que es quien se encarga de los prod.
const addProductToCart = async (cid, pid) => {
    const product = await productModel.findById(pid);
    
    //Se verifica si existe el producto. Retorna un objeto que tiene la propiedad product en false. Sirve para disntiguir con el del carrito
    if(!product) return {
        product: false
    };

    //Se usa el push del mongoose. Se pushea en la propiedad products (array) el product
    await cartModel.findByIdAndUpdate(cid, {$push: {products: product}});

    //Se busca el carrito porque no lo devuelve actualziado
    const cart = await cartModel.findById(cid);

    //Si no lo encuentra muestra el error
    if(!cart) return {
        cart: false
    };

    return cart;

}

export default {
    getById,
    create,
    addProductToCart
}
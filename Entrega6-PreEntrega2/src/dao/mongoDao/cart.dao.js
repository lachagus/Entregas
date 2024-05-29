import { cartModel } from "../models/cart.model.js";
import { productModel } from "../models/product.model.js";

const create = async (data) => {
    const cart = await cartModel.create(data);
    return cart;
};

const getById = async (id) => {
    const cart = await cartModel.findById(id);
    return cart;
};

//Agrega un producto al carrito
//Recibe el id del carrito y el id del producto
//Primero se debe buscar el producto. Se debe insertar el product model que es quien se encarga de los prod.
const addProductToCart = async (cid, pid) => {
    const product = await productModel.findById(pid);
    if (!product) return { product: false };
    const cart = await cartModel.findById(cid);
    if (!cart) return { cart: false };

    const productInCart = await cartModel.findOneAndUpdate({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantity": 1 } });

    if (!productInCart) {
        await cartModel.updateOne({ _id: cid }, { $push: { products: { product: pid, quantity: 1 } } });
    }

    const cartUpdate = await cartModel.findById(cid);

    //El populate sirve para ver todo lo del carrito, pero es màs complicado para la lectura, asì que lo saco y dejo comentado
    // const cartUpdate = await cartModel.findById(cid).populate("products.product");
    return cartUpdate;
};

//Es a la inversa que el add product to cart
const deleteProductInCart = async (cid, pid) => {
    const product = await productModel.findById(pid);
    if (!product) return { product: false };
    const cart = await cartModel.findOneAndUpdate({ _id: cid, "products.product": pid }, { $inc: { "products.$.quantity": -1 } });
    if (!cart) return { cart: false };

    // Busca el producto en el carrito actualizado
    const updatedProduct = cart.products.find(p => p.product.toString() === pid.toString());

    // Si la cantidad es 1, elimina el producto del carrito
    if (updatedProduct && updatedProduct.quantity === 1) {
        await cartModel.findByIdAndUpdate(
            cid,
            { $pull: { products: { product: pid } } },
            { new: true }
        );
    };

    const cartUpdate = await cartModel.findById(cid);
    return cartUpdate;
};

//Este método sólo funciona cuando seteo
const update = async (cid, data) => {
    await cartModel.updateOne({ _id: cid }, { $set: { products: [] } });
    await cartModel.updateOne({ _id: cid }, { $set: { products: data } });
    const cart = await cartModel.findById(cid);
    return cart;
};

const updateQuantityProductInCart = async (cid, pid, quantity) => {
    const product = await productModel.findById(pid);
    if (!product) return { product: false };

    //Busca el carrito específico y le actualiza la cantidad (quantity)
    const cart = await cartModel.findOneAndUpdate({ _id: cid, "products.product": pid }, { $set: { "products.$.quantity": quantity } });
    if (!cart) return { cart: false };

    const cartUpdate = await cartModel.findById(cid);
    return cartUpdate;
};

const deleteAllProductsInCart = async (cid) => {
    const cart = await cartModel.findByIdAndUpdate(cid, { $set: { products: [] } });

    const cartUpdate = await cartModel.findById(cid);
    return cartUpdate;
};

export default {
    getById,
    create,
    addProductToCart,
    deleteProductInCart,
    update,
    updateQuantityProductInCart,
    deleteAllProductsInCart,
}
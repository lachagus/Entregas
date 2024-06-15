//También trabajamos con el file system, lo importamos
import fs from "fs";

//Arreglo de carritos
let carts = [];

//Acá se van a crear los carritos
const pathFile = "./src/data/carts.json";

const getCarts = async () => {

    //Para que lea el archivo
    const cartsJson = await fs.promises.readFile(pathFile, "utf-8");
    carts = JSON.parse(cartsJson) || [];

    return (carts);
};

const createCart = async () => {
    await getCarts();

    const newCart = {
        id: carts.length + 1,
        products: []
    };

    //Agrega nuevo carrito creado anteriormente
    carts.push(newCart);

    await fs.promises.writeFile(pathFile, JSON.stringify(carts));

    return newCart;

};

//Recupera un carrito por ID
const getCartById = async (cid) => {
    await getCarts();

    //Busca el carrito con el ID = al carrito que se recibe
    const cart = carts.find(c => c.id === cid);

    //Si no encuentra el carrito con ese ID, muestra error
    if(!cart) return `No se encuentra el carrito con el ID ${cid}`

    //Si lo encuentra retorna todos los productos de ese carrito
    return cart.products;
}

//Fn. para agregar un producto al carrito. Recibe el ID del carrito y el ID del producto
const addProductToCart = async (cid, pid) => {

    //Se asignan los productos del array
    await getProducts();

    //Primero se busca carrito que coincide con el cid que se está recibiendo
    const index = carts.findIndex ( c => c.id === cid);

    //Si index = -1 no encuentra ese ID en la posición
    if(index === -1) return `No se encontró el carrito con el ID ${cid}`;

    // Se busca si el producto ya está en el carrito
    const productIndex = carts[index].products.findIndex(p => p.product === pid);

    // Si el producto ya está en el carrito, se suma la cantidad
    if (productIndex !== -1) {
        carts[index].products[productIndex].quantity++;
    } else {
        // Si no está en el carrito, se añade con cantidad 1
        carts[index].products.push({
            product: pid,
            quantity: 1
        });
    }


    //Retorna el carrito
    return carts[index]
};


export default {
    getCarts,
    getCartById,
    createCart,
    addProductToCart
}
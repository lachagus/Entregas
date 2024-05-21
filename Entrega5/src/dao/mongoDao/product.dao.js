import { productModel } from "../models/product.model.js";

//Trae todos los productos
const getAll = async () => {
    const products = await productModel.find();

    //Esta fn. retorna los productos encontrados
    return products;
}

//Esta función recibe un ID
const getById = async (id) => {
    const product = await productModel.findById(id);

    //Retorna el producto
    return product;
}

//Fn. que recibe la data que se va a almacenar en la BD
const create = async (data) => {
    const product = await productModel.create(data);

    //Retorna el producto
    return product;
}

//Esta función recibe un ID del prod, a actualizar y la data que se actualiza
const update = async (id, data) => {

    //No se almacena la data en una variable porque no devuelve la inf. actualizada, entonces se busca y luego se retorna la inf. actualizada
    await productModel.findByIdAndUpdate(id, data);

    //Busca el producto 
    const product = await productModel.findById(id);

    //Retorna el producto ya actualizado
    return product;
}

//Esta función recibe el ID a eliminar, tiene que conicidir con el ID con el de mongo
const deleteOne = async (id) => {
    const product = await productModel.deleteOne({_id: id});

    //Manejamos el error desde esta capa DAO
    if(product.deletedCount === 0) return false;

    //Retorna true porque avisa que se ha eliominado ese producto
    return true;
}

//Se exporta todo. Poniendo default después le puedo poner un alias
export default {
    getAll,
    getById,
    create,
    update,
    deleteOne
}
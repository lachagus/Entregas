//Modelo de los carritos

import mongoose from "mongoose";

//Nombre de la colección de carritos
const cartCollection = "carts";

//Esquema de los carritos
const cartSchema = new mongoose.Schema({
    product: {
        type: Array,
        default: []
    }
})

//Modelos
export const cartCollectionModel = mongoose.model(cartCollection, cartSchema);
//Modelo de los productos

import mongoose from "mongoose";

//Nombre de la colección de productos
const productCollection = "products";

//Esquema de los productos
const productSchema = new mongoose.Schema ({
    title: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true
    },

    thumbnail: {
        type: Array,
        default: []
    },

    code: {
        type: String,
        requiere: true
    },

    stock: {
        type: Number,
        requiere: true
    },

    status: {
        type: Boolean,
        default: true
    }
})

//Modelos
export const productModel = mongoose.model(productCollection, productSchema);
//Modelo de los productos
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

//Colección de productos
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

    price: {
        type: Number,
        requiere: true
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
    },

    category: {
        type: String,
        require: true
    }
});

//Se agrega el pluggin para poder hacer la paginación
productSchema.plugin(mongoosePaginate);

//Modelo
export const productModel = mongoose.model(productCollection, productSchema);

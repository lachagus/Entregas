import mongoose from "mongoose";

//Colección de tickes
const ticketCollection = "tickets";

//Esquema de los tickets
const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    purchase_datatime: {
        type: Date,
        default: Date.now(),
    },
    amount: {
        type: Number,
        required: true,
    },
    purchaser: {
        type: String,
        required: true,
    }
});

// ticketSchema.pre("find", function () {
//     this.populate("products.product");
// });

ticketSchema.pre("find", function () {
    this.populate("tickes.ticket");
});

export const ticketModel = mongoose.model(ticketCollection, ticketSchema);
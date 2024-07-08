import mongoose from "mongoose";

//Colección de cuentas
const accountCollection = "account";

//Esquema de las cuentas
const accountSchema = new mongoose.Schema({
    number: { type: String, required: true }, //es string por el límite de los número, js no los soporta
    alias: { type: String, required: true },
    balance: { type: Number, default: 0 },
    userId: { type: String, default: null }
});

export const accountModel = mongoose.model(accountCollection, accountSchema);
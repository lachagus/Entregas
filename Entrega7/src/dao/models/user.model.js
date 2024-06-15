import mongoose from "mongoose";

const userCollection = "user";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    edad: Number
});

export const userModel = mongoose.model(userCollection, userSchema);
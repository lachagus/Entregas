import jwt from "jsonwebtoken";
import envs from "../config/env.config.js"

//Fn. que crea el token
export const createToken = (user) => {
    const { _id, email, role, cart } = user;
    const token = jwt.sign({ _id, email, role, cart }, envs.CODE_SECRET, { expiresIn: "1m" });
    return token;
};

//Fn. que verifica el token
export const verifyToken = (token) => {
    try {
        const decode = jwt.verify(token, envs.CODE_SECRET);
        return decode;
    } catch (error) {
        return null;
    }
}; 
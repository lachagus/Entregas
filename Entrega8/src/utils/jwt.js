import jwt from "jsonwebtoken";

//Fn. que crea el token
export const createToken = (user) => {
    const { _id, email } = user;
    const token = jwt.sign({ _id, email }, "Adivinalo", { expiresIn: "1m" });
    return token;
};

//Fn. que verifica el token
export const verifyToken = (token) => {
    try {
        const decode = jwt.verify(token, "Adivinalo");
        return decode;
    } catch (error) {
        return null;
    }

}; 
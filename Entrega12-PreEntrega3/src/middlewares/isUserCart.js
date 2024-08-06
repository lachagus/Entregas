import { request, response } from "express";

export const isUserCart = async (req = request, res = response, next) => {
    const { cid } = req.params;
    //Verifica si el carrito es del usuario
    if (req.user.cart !== cid) return res.status(401).json({ status: "error", msg: "El ID del carrito no corresponde al usuario." });

    next();
};
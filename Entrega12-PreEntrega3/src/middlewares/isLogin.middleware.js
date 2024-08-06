import { request, response } from "express";

export const isLogin = async (req = request, res = response, next) => {

    //Chequea si hay una sesión. Si es así, continúa
    if (req.session.user) {
        next();

    //Si no, muestra error
    } else {
        res.status(401).json({ status: "Error", msg: "Usuario no logueado." });
    }

}
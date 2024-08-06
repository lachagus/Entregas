import { request, response } from "express";
import passport from "passport";

//Recibe la estrategia que se va a usar (cualquiera de las que están configuradas)
export const passportCall = (strategy) => {
    //Retorna otra fn. Usa el request y response de express
    return async (req = request, res = response, next) => {
        passport.authenticate(strategy, { session: false }, (error, user, info) => {
            if (error) return next(error);
            if (!user) return res.status(401).json({ status: "error", msg: info.message ? info.message : info.toString() });
            //Setea el user
            req.user = user;
            next();
        })(req, res, next);
    };
};

//Recibe el rol del user
export const authorization = (role) => {
    return async (req = request, res = response, next) => {
        //Chequea si existe el user
        if (!req.user) return res.status(401).json({ status: "error", msg: "No autorizado." });
        //Chequea si está autorizado según el rol
        if (req.user.role !== role) return res.status(403).json({ status: "error", msg: "No tienes permiso." });
        //Si todo está OK, continúa
        next();
    };
};
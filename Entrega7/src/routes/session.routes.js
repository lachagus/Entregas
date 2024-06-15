import { Router } from "express";
import userDao from "../dao/mongoDao/user.dao.js";

const router = Router();

//Registro del user
router.post("/register", async (req, res) => {
    try {
        //Recibe los datos del body del user
        const userData = req.body;

        //La data que se recibe se registra
        const newUser = await userDao.create(userData);

        //Si no llega ningún user, se retorna error
        if (!newUser) return res.status(400).json({ status: "Error", msg: "No se pudo registrar el usuario." });

        //res.status(201).json({status: "success", payload: userData});
        //Devuelve con el ID de Mongo
        res.status(201).json({ status: "success", payload: newUser });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal Server Error" });
    };
});

//Login del user
router.post("/login", async (req, res) => {
    try {
        //Datos que recibe del user
        const { email, password } = req.body;

        //Verifica que el user sea administrador
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {

            //Si se cumple se guarda la sesión de user con rol admin
            req.session.user = {
                email,
                role: "admin",
            };

            return res.status(200).json({ status: "success", payload: req.session.user });
        }

        //En caso de que no sea admin
        const user = await userDao.getByEmail(email);

        //Si no encuentra el user
        if (!user || user.password !== password) {
            return res.status(401).json({ status: "Error", msg: "Email o password no válidos" });
        }

        //Guarda la sesiòn del user que no es admin
        req.session.user = {
            email,
            role: "user",
        };

        res.status(200).json({ status: "success", payload: req.session.user });
        //res.status(200).json({ status: "success", payload: { user } });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal Server Error" });
    };
});

//Logout del user
router.get("/logout", async (req, res) => {
    try {

        //Se destruye la sesión
        req.session.destroy();

        res.status(200).json({ status: "success", msg: "Sesión cerrada con éxito" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal Server Error" });
    }
});

export default router;
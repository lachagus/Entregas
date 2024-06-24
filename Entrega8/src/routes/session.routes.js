import { Router } from "express";
import userDao from "../dao/mongoDao/user.dao.js";
import { createToken, verifyToken } from "../utils/jwt.js";
import passport from "passport";
import { isValidPassword } from "../utils/hashPassword.js";

const router = Router();

//Registro del user. Se pasa como parámetro la estrategia de passport que se va a utilizar. En este caso es la estrategia con noombre "register"
router.post("/register", passport.authenticate("register"), async (req, res) => {
    try {
        //Se elimina toda la creación del usuario porque de esto ya se encarga passport
        //La única responsabilidad que tiene el endpoint es dar una respuesta al cliente     
        res.status(201).json({ status: "success", msg: "Usuario creado." });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal Server Error." });
    };
});

//Login del user de manera local
router.post("/login", passport.authenticate("login"), async (req, res) => {
    try {
        //Se elimina todo el login del usuario porque de esto ya se encarga passport
        //La única responsabilidad que tiene el endpoint es dar una respuesta al cliente  
        return res.status(200).json({ status: "success", payload: req.user });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal Server Error" });
    };
});

//Endpoint del token 
router.post("/jwt", async (req, res) => {
    try {
        //Recibe el email y pwd para hacer el login del user
        const { email, password } = req.body;
        const user = await userDao.getByEmail(email);

        //Verifica si el user o la password que se recibe no son iguales
        if (!user || !isValidPassword(user, password)) return res.status(401).json({ status: "error", msg: "Usuario o contraseña no válido." });

        const token = createToken(user);

        //Guarda el token en una cookie
        res.cookie("token", token, { httpOnly: true });

        return res.status(200).json({ status: "success", payload: user, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal Server Error" });
    };
});

//Endpoint que recibe desde la cookie el token y lo verifica
router.get("/current", (req, res) => {
    try {
        //const { token } = req.body;
        const token = req.cookies.token;
        const checkToken = verifyToken(token);

        if (!checkToken) return res.status(403).json({ status: "error", msg: "Token inválido" });

        return res.status(200).json({ status: "success", payload: checkToken });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal Server Error" });
    }
});

//Login del user con Google
router.get("/google", passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
    session: false
}), async (req, res) => {
    try {
        //Se elimina todo el login del usuario porque de esto ya se encarga passport
        //La única responsabilidad que tiene el endpoint es dar una respuesta al cliente  
        return res.status(200).json({ status: "success", payload: req.user });

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error", msg: "Internal Server Error" });
    };
})

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
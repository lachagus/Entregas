import { Router } from "express";
import passport from "passport";
import userDao from "../dao/mongoDao/user.dao.js";
import { createToken, verifyToken } from "../utils/jwt.js";
import { isValidPassword } from "../utils/hashPassword.js";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import { userLoginValidator } from "../validators/userLogin.validator.js";

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

//Endpoint del token. Usa el validator para los mensajes de errores
router.post("/jwt", userLoginValidator, async (req, res) => {
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

//Endpoint que recibe desde la cookie el token y lo verifica.
//El passportCall utiliza la estrategia de JWT
//router.get("/current", passportCall("jwt"), authorization("user"), (req, res) => {
//Está hardcodeado el user...
    router.get("/current", passportCall("jwt"), authorization("admin"), (req, res) => {
    try {
        return res.status(200).json({ status: "success", payload: req.user });

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
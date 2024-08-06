import { Router } from "express";
import passport from "passport";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import sessionsControllers from "../controllers/sessions.controllers.js";

const router = Router();

//Registro del user. Se pasa como parámetro la estrategia de passport que se va a utilizar. En este caso es la estrategia con noombre "register"
router.post("/register", passport.authenticate("register"), sessionsControllers.register);

//Login del user de manera local
router.post("/login", passport.authenticate("login"), sessionsControllers.login);

//Endpoint que recibe desde la cookie el token y lo verifica.
//El passportCall utiliza la estrategia de JWT
router.get("/current", passportCall("jwt"), authorization("admin"), sessionsControllers.current);

//Login del user con Google
router.get("/google", passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"],
    session: false
}), sessionsControllers.loginGoogle);

//Logout del user
router.get("/logout", sessionsControllers.logout);

export default router;
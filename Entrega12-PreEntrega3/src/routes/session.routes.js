import { Router } from "express";
import passport from "passport";
import { authorization, passportCall } from "../middlewares/passport.middleware.js";
import sessionsControllers from "../controllers/sessions.controllers.js";
import { sendMail } from "../utils/sendMails.js";
import { sendSMS } from "../utils/sendSMS.js";

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

//Endpoint provisorio del send mail
router.get("/email", async (req, res) => {
    const {name} = req.body;
    const template = `
        <div>
            <h1> Bienvenidx ${name} a Guapura Diseño </h1>
            <h2> ¡Qué bueno, recibiste nuestro correo! </h2>
            <img src="cid:beTheChange" />
        </div> 
        `;
    await sendMail("chagusbigand@gmail.com", "Test NodeMailer", "Esta es una prueba.", template);
    return res.status(200).json({status: "OK", msg: "El correo ha sido enviado con éxito."});
});

//Endpoint provisorio del send SMS
router.get("/sms", async (req, res) => {
    await sendSMS("+543464696477", "Esta es una prueba.");
    return res.status(200).json({status: "OK", msg: "El SMS ha sido enviado con éxito."});
});

export default router;
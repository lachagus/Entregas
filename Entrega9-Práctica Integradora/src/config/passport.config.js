//Configuración de las estrategias de login y registro
import passport from "passport";
import local from "passport-local";
import jwt from "passport-jwt";
import userServices from "../services/user.services.js";
import accountServices from "../services/account.services.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import { cookieExtractor } from "../utils/cookieExtractor.js";

const LocalStrategy = local.Strategy;
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

export const initializePassport = () => {

    // Estrategia local de registro
    passport.use(
        "register",
        new LocalStrategy({ passReqToCallback: true, usernameField: "email" },
            async (req, username, password, done) => {
                try {

                    //Desestructura el body
                    const { name, lastName } = req.body;

                    //Busca si existe el user o no a través del email que es único 
                    const user = await userServices.getOnUser({ email: username });

                    //Controla el error si ya existe el user
                    if (user) return done(null, false, { message: "El usuario ya existe" });

                    //Crea una cuenta que se asocia directamente al user, se hace desde los servicios
                    const accountUser = await accountServices.createAccount({ name, lastName });

                    //Si no existe, lo crea (_id viene dede mongo y lo devuelve con el _)
                    const newUser = {
                        name,
                        lastName,
                        email: username,
                        password: createHash(password),
                        account: accountUser._id,
                    };

                    //Se registra el user y se inyecta  la cuenta bancaria en el id del user
                    const createUser = await userServices.registerUser(newUser);

                    await accountServices.updateAccount(accountUser._id, { userId: createUser._id })

                    return done(null, createUser);

                } catch (error) {
                    return done(error);
                }
            })
    );

    passport.use(
        "login",
        new LocalStrategy({ usernameField: "email" },
            async (username, password, done) => {
                try {
                    const user = await userServices.getOnUser({ email: username });

                    if (!user || !isValidPassword(user, password)) return done(null, false, { message: "Usuario o contraseña no válido" });

                    return done(null, user);

                } catch (error) {
                    done(error)
                }
            })
    )

    passport.use(
        "jwt",
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
                secretOrKey: "codigoSecreto",
            },
            async (jwt_payload, done) => {

                try {
                    return done(null, jwt_payload);

                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    //Serializa y desserializa el user
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userServices.getOnUser({ _id: id });
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
};


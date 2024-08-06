import passport from "passport";
//Estrategia local
import local from "passport-local";
//Se importa Google Strategy
import google from "passport-google-oauth20";
//Estrategia de JWT
import jwt from "passport-jwt";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import userDao from "../dao/mongoDao/user.dao.js";

import envs from "./env.config.js"

//Se configura la estrategia local que se va a utilizar
const localStrategy = local.Strategy;
//Se inicializa la estrategia de Google
const googleStrategy = google.Strategy;
//Configuraciòn de estrategia JWT
const JWTStrategy = jwt.Strategy;
//Extractor de info del request
const ExtractJWT = jwt.ExtractJwt;

//Fn. cookie extrator, recibe un request
const cookieExtracto = (req) => {
    let token = null;
    //Verifica que haya una request y si en la req hay una cookie
    if (req && req.cookies) {
        token = req.cookies.token;
    }
    return token;
};

//Fn. que iniciliaza todas las estrategias que se vayan configurando
const inicializePassport = () => {

    //Inicializa la estrategia del registro. El nombre de la estrategia es register
    //passReqToCallback permite que se obtenga la req del user que se recibe
    //Para passport sólo existen estas dos porp. que puede recibir: username y password. El usernameField: equivale al campo email
    //El done es una fn. que avisa a passport si salió todo OK o se envía error (similar al next)
    passport.use(
        "register",
        new localStrategy(
            { passReqToCallback: true, usernameField: "email" },
            async (req, username, password, done) => {
                try {
                    //Recibe los datos del body del user. Se desestructira lo que se necesita que llegue a la BD
                    //El password no hace falta en los parámetros ya que se obtiene con la fn. async anterior
                    const { first_name, last_name, email, age, role } = req.body;

                    //El username es el equivale a email
                    const user = await userDao.getByEmail(username);

                    //Si el user existe, retorna error
                    //Por ahora no va a andar porque hay que hacer otras configuraciones que se verán más adelante
                    if (user) return done(null, false, { message: "El usuario ya existe." });

                    //En caso de que no existe, se crea un objeto newUser para que se registre. Se controla la data que se recibe del body, pero la propiedad password va a tener el pwd hasheado
                    const newUser = {
                        first_name,
                        last_name,
                        email,
                        password: createHash(password),
                        age,
                        role
                    };

                    const createUser = await userDao.create(newUser);
                    return done(null, createUser);

                } catch (error) {
                    return done(error);
                }
            }
        ));

    //Estrategia del login   
    passport.use(
        "login",
        new localStrategy({ usernameField: "email" }, async (username, password, done) => {
            try {
                const user = await userDao.getByEmail(username);
                if (!user || !isValidPassword(user, password)) return done(null, false, { message: "Email o password inválido." });

                //Si están OK los datos del user
                return done(null, user);

            } catch (error) {
                done(error);
            };
        }
        )
    );

    //Middleware de passport para la estrategia Google
    passport.use(
        "google",
        new googleStrategy(
            {
                //Se obtiene a través de Google
                clientID: envs.GOOGLE_CLIENT_ID,
                clientSecret: envs.GOOGLE_CLIENT_SECRET,
                callbackURL: "http://localhost:8080/api/session/google"
            },

            //cb: callback --> es una fn.
            //accessToken por ahora no lo usamos
            async (accessToken, refreshToken, profile, cb) => {
                try {

                    //Desestructura lo que se recibe del profile: info que da Google del user que se loguea
                    const { name, emails } = profile;

                    //console.log(profile);

                    //Objeto user con los datos registrados en Google. el email viene como array
                    const user = {
                        first_name: name.givenName,
                        last_name: name.familyName,
                        email: emails[0].value
                    };

                    //Chequea que exista el user
                    const existUser = await userDao.getByEmail(emails[0].value);
                    if (existUser) return cb(null, existUser);

                    //En caso de que no se cumple, se crea user SIN PWD, porque se accede con las credenciales de Google de manera segura
                    const newUser = await userDao.create(user);
                    cb(null, newUser);

                } catch (error) {
                    return cb(error);
                }
            }
        )
    );

    //Middleware de passport para la estrategia JWT
    passport.use(
        "jwt",
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromExtractors([cookieExtracto]),
                secretOrKey: envs.CODE_SECRET,
            },
            //En el payload está el token
            async (jwt_payload, done) => {
                try {
                    return done(null, jwt_payload);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    //Serialización del user: convierte un objeto del user en un identificador único
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    //Deserialización del user: recupera un objeto del user a partir de un identificador único
    passport.deserializeUser(async (id, done) => {
        const user = await userDao.getByEmail(id);
        done(null, user);
    });
};

export default inicializePassport;
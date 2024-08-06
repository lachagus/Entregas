import dotenv from "dotenv";

//Ejecución del paquete y se puedan leer las variables de entorno
const enviroment = "DEV"
dotenv.config({
    path: enviroment === "PRODUCTION" ? "./.env.prod" : "./.env.dev"
});

//Objeto de configuración. Permite utilziar en toda la app la configuración de las var. de entorno
//Se exporta por defecto las var. de ent.
export default {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    CODE_SECRET: process.env.CODE_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GMAIL_PASS: process.env.GMAIL_PASS,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_SMS_NUMBER: process.env.TWILIO_SMS_NUMBER,
};
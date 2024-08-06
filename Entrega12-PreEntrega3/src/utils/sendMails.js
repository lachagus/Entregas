import nodemailer from "nodemailer";
import envs from "../config/env.config.js";
import __dirname from "../../dirname.js";

//Conf. del transporte que se encarga de ejecutar el ss. de gmail y hacer el envío de correos electrónicos 
export const sendMail = async (email, subject, message, template) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        auth: {
            user: "guapura.ds@gmail.com",
            pass: envs.GMAIL_PASS
        }
    });

    //El sendMail de acá es un método ya configurado, ene ste caso se llama igual que la var. de arriba
    await transporter.sendMail({
        from: "guapura.ds@gmail.com",
        to: email,
        subject,
        text: message,
        html: template,
        attachments: [
            {
                filename: "beTheChange.png",
                path: __dirname + "/public/images/beTheChange.png",
                cid: "beTheChange"
            }
        ]
    });
};
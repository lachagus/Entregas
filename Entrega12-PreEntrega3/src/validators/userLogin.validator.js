import { body, validationResult } from "express-validator";

//Por cada elem. del array se chequea un dato
export const userLoginValidator = [

    //Valida la propiedad email. Se saca de la petición.
    body("email")
        .isEmail().withMessage("El correo debe ser un email válido.")
        .notEmpty().withMessage("El correo es obligatorio."),

    //Valida la propiedad password
    body("password")
        .notEmpty().withMessage("La contraseña es obligatoria."),

    //Fn. que valida lo que viene por request
    (req, res, next) => {
        const errors = validationResult(req);

        //Verifica si hay algún error
        if (!errors.isEmpty()) {
            //Formatea, mapea la respuesta de errores
            const formatErrors = errors.array().map(e => {
                return { msg: e.msg, data: e.path }
            });
            //Si error no viene vacío
            return res.status(400).json({ status: "error", errors: formatErrors });
        };
        //Si no hay errores continúa
        next();
    },
];
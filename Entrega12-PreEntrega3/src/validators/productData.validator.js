import { body, validationResult } from "express-validator";

//Fn. de array por cada elemento que se quiera validar
export const productDataValidator = [
    // Valida título del prod.
    body("title")
        .isString().withMessage("El título tiene que ser un texto.")
        .notEmpty().withMessage("El título es obligatorio.")
        .isLength({ min: 3 }).withMessage("Tiene que tener al menos 3 caracteres."),

    // Valida descripción del prod.
    body("description")
        .isString().withMessage("La descripción tiene que ser un texto.")
        .notEmpty().withMessage("La descripción es obligatoria.")
        .isLength({ min: 3 }).withMessage("Tiene que tener al menos 3 caracteres."),
    
    // Valida thumbnail del prod.
    body("thumbnail").isArray().withMessage("Tiene que ser un array."),

    // Valida código del prod.
    body("code")
        .isString().withMessage("El código tiene que ser un texto.")
        .notEmpty().withMessage("El código es obligatorio.")
        .isLength({ min: 3 }).withMessage("Tiene que tener al menos 3 caracteres."),
    
    // Valida stock del prod.
    body("stock")
        .isNumeric().withMessage("Tiene que ser un número")
        .notEmpty().withMessage("El stock es obligatorio"),
    
    // Valida estado del prod.
    body("status")
        .optional()  // Esto hace que la validación sea opcional
        .isBoolean().withMessage("El estado tiene que ser un booleano"),

    // Valida precio del prod.
    body("price")
        .isNumeric().withMessage("Tiene que ser un número")
        .notEmpty().withMessage("El precio es obligatorio"),

    // Valida categoría del prod.
    body("category")
        .isString().withMessage("La categoría tiene que ser un texto")
        .notEmpty().withMessage("La categoría es obligatoria")
        .isLength({ min: 3 }).withMessage("Tiene que tener al menos 3 caracteres"),

    // Valida lo que recibe por request
    (req, res, next) => {
        const errors = validationResult(req); 
        // Verificar si hay algún error
        if (!errors.isEmpty()) {
            // Formateamos la respuesta de errores
            const formatErrors = errors.array().map(e => {
                return { msg: e.msg, data: e.path }
            });
            // Si error no viene vacío
            return res.status(400).json({ status: "error", errors: formatErrors });
        };

        // Si no hay errores continuamos
        next();
    },
];

//Archivo de Indexación: se indexan todas las rutas (se importan)

import { Router } from "express";
import userRoutes from "./user.routes.js";
import accountRoutes from "./account.routes.js";
import movementRoutes from "./movement.routes.js"

const router = Router();
router.use("/user", userRoutes);
router.use("/account", accountRoutes);
router.use("/movement", movementRoutes);

export default router;
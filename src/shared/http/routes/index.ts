import { Router } from "express";
import { rotasPlataforma } from "./plataformas.routes";
import { rotaMarcas } from "./marcas.routes";

const router = Router();

router.use("/plataformas", rotasPlataforma);
router.use("/marcas", rotaMarcas);

export { router };
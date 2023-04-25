import { Router } from "express";
import { rotasPlataforma } from "./plataformas.routes";
import { rotasMarcas } from "./marcas.routes";
import { rotasProdutos } from "./produtos.routes";

const router = Router();

router.use("/plataformas", rotasPlataforma);
router.use("/marcas", rotasMarcas);
router.use("/produtos", rotasProdutos)

export { router };
import { Router } from "express";
import { rotasPlataforma } from "./plataformas.routes";
import { rotasMarcas } from "./marcas.routes";
import { rotasProdutos } from "./produtos.routes";
import { rotasUsuarios } from "./usuarios.routes";
import { rotasAuth } from "./auth.routes";
import { rotasPedidos } from "./pedidos.routes";

const router = Router();

router.use("/plataformas", rotasPlataforma);
router.use("/marcas", rotasMarcas);
router.use("/produtos", rotasProdutos);
router.use("/usuarios", rotasUsuarios);
router.use("/pedidos", rotasPedidos);
router.use("/auth", rotasAuth);

export { router };
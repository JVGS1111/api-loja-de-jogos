import { AdicionarMarcaController } from "@modules/marcas/useCases/adicionarMarca/AdicionarMarcaController";
import { ListarMarcasController } from "@modules/marcas/useCases/listarMarcas/ListarMarcasController";
import { Router } from "express";
import { ensureAdmin } from "middlewares/ensureAdmin";
import { ensureAuthenticated } from "middlewares/ensureAuthenticated";

const rotasMarcas = Router();

const adicionarMarcaController = new AdicionarMarcaController();
const listarMarcasController = new ListarMarcasController()


rotasMarcas.post("/", ensureAuthenticated, ensureAdmin, adicionarMarcaController.handle);
rotasMarcas.get("/", listarMarcasController.handle);

export { rotasMarcas };
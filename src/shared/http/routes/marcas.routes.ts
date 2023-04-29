import { AdicionarMarcaController } from "@modules/marcas/useCases/adicionarMarca/AdicionarMarcaController";
import { EditarMarcaController } from "@modules/marcas/useCases/editarMarca/EditarMarcaController";
import { ListarMarcasController } from "@modules/marcas/useCases/listarMarcas/ListarMarcasController";
import { Router } from "express";
import { ensureAdmin } from "middlewares/ensureAdmin";
import { ensureAuthenticated } from "middlewares/ensureAuthenticated";

const rotasMarcas = Router();

const adicionarMarcaController = new AdicionarMarcaController();
const listarMarcasController = new ListarMarcasController();
const editarMarcaController = new EditarMarcaController();

rotasMarcas.post("/", ensureAuthenticated, ensureAdmin, adicionarMarcaController.handle);
rotasMarcas.put("/:id", ensureAuthenticated, ensureAdmin, editarMarcaController.handle);
rotasMarcas.get("/", listarMarcasController.handle);

export { rotasMarcas };
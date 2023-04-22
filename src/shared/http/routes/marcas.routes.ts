import { AdicionarMarcaController } from "@modules/marcas/useCases/adicionarMarca/AdicionarMarcaController";
import { ListarMarcasController } from "@modules/marcas/useCases/listarMarcas/ListarMarcasController";
import { Router } from "express";

const rotaMarcas = Router();

const adicionarMarcaController = new AdicionarMarcaController();
const listarMarcasController = new ListarMarcasController()


rotaMarcas.post("/", adicionarMarcaController.handle);
rotaMarcas.get("/", listarMarcasController.handle);

export { rotaMarcas };
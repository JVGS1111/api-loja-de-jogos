import { ListarPlataformasController } from "@modules/plataformas/useCases/listarPlataformas/ListarPlataformasController";
import { Router } from "express";
import { ensureAdmin } from "middlewares/ensureAdmin";
import { ensureAuthenticated } from "middlewares/ensureAuthenticated";
import { AdicionarPlataformaController } from "modules/plataformas/useCases/adicionarPlataforma/AdicionarPlataformaController";

const rotasPlataforma = Router();

const adicionarPlataformaController = new AdicionarPlataformaController();
const listarPlataformasController = new ListarPlataformasController();

rotasPlataforma.post("/", ensureAuthenticated, ensureAdmin, adicionarPlataformaController.handle);
rotasPlataforma.get("/", listarPlataformasController.handle);

export { rotasPlataforma };
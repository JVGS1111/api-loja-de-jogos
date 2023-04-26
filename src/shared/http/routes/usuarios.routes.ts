import { CadastrarUsuarioController } from "@modules/usuarios/useCases/cadastrarUsuario/CadastrarUsuarioController";
import { Router } from "express";

const rotasUsuarios = Router();

const cadastrarUsuarioController = new CadastrarUsuarioController();

rotasUsuarios.post("/cliente", cadastrarUsuarioController.handle);

export { rotasUsuarios };
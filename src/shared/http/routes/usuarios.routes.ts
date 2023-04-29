import { CadastrarUsuarioController } from "@modules/usuarios/useCases/cadastrarUsuario/CadastrarUsuarioController";
import { ObterPerfilController } from "@modules/usuarios/useCases/obterPerfil/ObterPerfilController";
import { Router } from "express";
import { ensureAuthenticated } from "middlewares/ensureAuthenticated";

const rotasUsuarios = Router();

const cadastrarUsuarioController = new CadastrarUsuarioController();
const obterPerfilController = new ObterPerfilController();

rotasUsuarios.post("/cadastrar", cadastrarUsuarioController.handle);
rotasUsuarios.get("/me", ensureAuthenticated, obterPerfilController.handle);

export { rotasUsuarios };
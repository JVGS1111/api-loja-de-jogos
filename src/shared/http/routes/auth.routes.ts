import { AutenticarUsuarioController } from "@modules/usuarios/useCases/autenticarUsuario/AutenticarUsuarioController";
import { Router } from "express";

const rotasAuth = Router();

const autenticarUsuarioController = new AutenticarUsuarioController();

rotasAuth.post("/login", autenticarUsuarioController.handle);

export { rotasAuth };
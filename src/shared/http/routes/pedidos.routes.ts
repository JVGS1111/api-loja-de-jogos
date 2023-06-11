
import { CriarPedidoController } from "@modules/pedidos/useCases/CriarPedido/CriarPedidoController";
import { Router } from "express";
import { ensureAuthenticated } from "middlewares/ensureAuthenticated";

const rotasPedidos = Router();

const criarPedidoController = new CriarPedidoController();

rotasPedidos.post("/novo", ensureAuthenticated, criarPedidoController.handle);

export { rotasPedidos };
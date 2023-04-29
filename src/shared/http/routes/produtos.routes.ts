import { CadastrarProdutoController } from "@modules/produtos/useCases/cadastrarProduto/CadastrarProdutoController";
import { ListarProdutosController } from "@modules/produtos/useCases/listarProdutos/ListarProdutosController";
import { Router } from "express";
import { ensureAdmin } from "middlewares/ensureAdmin";
import { ensureAuthenticated } from "middlewares/ensureAuthenticated";

const rotasProdutos = Router();
const cadastrarProdutoController = new CadastrarProdutoController();
const listarProdutosController = new ListarProdutosController();

rotasProdutos.post("/", ensureAuthenticated, ensureAdmin, cadastrarProdutoController.handle);
rotasProdutos.get("/", listarProdutosController.handle);

export { rotasProdutos };
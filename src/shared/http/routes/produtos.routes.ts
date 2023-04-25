import { CadastrarProdutoController } from "@modules/produtos/useCases/cadastrarProduto/CadastrarProdutoController";
import { Router } from "express";

const rotasProdutos = Router();
const cadastrarProdutoController = new CadastrarProdutoController();

rotasProdutos.post("/", cadastrarProdutoController.handle);

export { rotasProdutos };
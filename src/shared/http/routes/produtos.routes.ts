import { CadastrarProdutoController } from "@modules/produtos/useCases/cadastrarProduto/CadastrarProdutoController";
import { ListarProdutosController } from "@modules/produtos/useCases/listarProdutos/ListarProdutosController";
import { Router } from "express";

const rotasProdutos = Router();
const cadastrarProdutoController = new CadastrarProdutoController();
const listarProdutosController = new ListarProdutosController();

rotasProdutos.get("/", listarProdutosController.handle);
rotasProdutos.post("/", cadastrarProdutoController.handle);

export { rotasProdutos };
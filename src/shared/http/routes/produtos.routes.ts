import uploadImages from "@config/uploadImages";
import { CadastrarFotoProdutoController } from "@modules/produtos/useCases/cadastrarFotoProduto/CadastrarFotoProdutoController";
import { CadastrarProdutoController } from "@modules/produtos/useCases/cadastrarProduto/CadastrarProdutoController";
import { DeletarFotoProdutoController } from "@modules/produtos/useCases/deletarFotoProduto/DeletarFotoProdutoController";
import { EditarProdutoController } from "@modules/produtos/useCases/editarProduto/EditarProdutoController";
import { ListarProdutosController } from "@modules/produtos/useCases/listarProdutos/ListarProdutosController";
import { ObterProdutoController } from "@modules/produtos/useCases/obterProduto/ObterProdutoController";
import { Router } from "express";
import { ensureAdmin } from "middlewares/ensureAdmin";
import { ensureAuthenticated } from "middlewares/ensureAuthenticated";
import multer from "multer";

const rotasProdutos = Router();
const upload = multer(uploadImages.upload('./imagens/produtos'));

const cadastrarProdutoController = new CadastrarProdutoController();
const listarProdutosController = new ListarProdutosController();
const cadastrarFotoProdutosController = new CadastrarFotoProdutoController();
const deletarFotoProdutosController = new DeletarFotoProdutoController()
const editarProdutoController = new EditarProdutoController();
const obterProdutoController = new ObterProdutoController();

rotasProdutos.post("/", ensureAuthenticated, ensureAdmin, cadastrarProdutoController.handle);
rotasProdutos.post("/imagens/:id", ensureAuthenticated, ensureAdmin, upload.array("imagens"), cadastrarFotoProdutosController.handle);
rotasProdutos.delete("/imagens/deletar", ensureAuthenticated, ensureAdmin, deletarFotoProdutosController.handle);
rotasProdutos.put("/editar/:id", ensureAuthenticated, ensureAdmin, editarProdutoController.handle);
rotasProdutos.get("/", listarProdutosController.handle);
rotasProdutos.get("/:id", obterProdutoController.handle);

export { rotasProdutos };
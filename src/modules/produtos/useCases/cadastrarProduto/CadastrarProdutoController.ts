import { Request, Response } from "express";
import { container } from "tsyringe";
import { CadastrarProdutoUseCase } from "./CadastrarProdutoUseCase";


class CadastrarProdutoController {

    async handle(req: Request, res: Response) {
        const {
            nome_produto,
            descricao_produto,
            id_plataforma,
            preco,
            quantidade,
            disponivel,
            id_marca
        } = req.body;

        const cadastrarProdutosUseCase = container.resolve(CadastrarProdutoUseCase);
        const produto = await cadastrarProdutosUseCase.execute({
            descricao_produto,
            disponivel,
            id_marca,
            id_plataforma,
            nome_produto,
            preco,
            quantidade
        });

        return res.status(200).json(produto);
    }
}

export { CadastrarProdutoController };
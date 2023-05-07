import { Request, Response } from "express";
import { container } from "tsyringe";
import { EditarProdutoUseCase } from "./EditarProdutoUseCase";


export class EditarProdutoController {

    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const {
            nome_produto,
            descricao_produto,
            id_plataforma,
            preco,
            quantidade,
            disponivel,
            promocao,
            porcentagem_promocao
        } = req.body;

        const editarProdutoUseCase = container.resolve(EditarProdutoUseCase);
        const produto = await editarProdutoUseCase.execute({
            id,
            nome_produto,
            descricao_produto,
            id_plataforma,
            preco,
            quantidade,
            disponivel,
            promocao,
            porcentagem_promocao
        })

        return res.json(produto);

    }
}
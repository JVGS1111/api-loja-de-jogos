import { Request, Response } from "express";
import { container } from "tsyringe";
import { ObterProdutoUseCase } from "./ObterProdutoUseCase";


export class ObterProdutoController {

    async handle(req: Request, res: Response) {
        const { id } = req.params;

        const obterProdutoUseCase = container.resolve(ObterProdutoUseCase);

        const produto = await obterProdutoUseCase.execute(id);

        return res.json(produto);
    }
}
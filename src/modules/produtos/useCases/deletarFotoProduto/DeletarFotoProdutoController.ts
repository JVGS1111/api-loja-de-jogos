import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletarFotoProdutoUseCase } from "./DeletarFotoProdutoUseCase";

export class DeletarFotoProdutoController {

    async handle(req: Request, res: Response) {
        const {
            arquivos
        } = req.body;

        const deletarFotoProdutoUseCase = container.resolve(DeletarFotoProdutoUseCase);

        await deletarFotoProdutoUseCase.execute({ arquivos });

        return res.status(201).send();
    }
}
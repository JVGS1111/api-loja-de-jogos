import { Request, Response } from "express";
import { container } from "tsyringe";
import { CadastrarFotoProdutoUseCase } from "./CadastrarFotoProdutoUseCase";

interface IFiles {
    filename: string;
}

export class CadastrarFotoProdutoController {

    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const imagens = req.files as IFiles[];

        const cadastrarFotoProdutoUseCase = container.resolve(CadastrarFotoProdutoUseCase);

        const nome_imagens = imagens.map((arquivo) => arquivo.filename);
        await cadastrarFotoProdutoUseCase.execute({ id_produto: id, nome_imagens });

        return res.status(201).send();
    }
}
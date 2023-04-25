import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListarProdutosUseCase } from "./ListarProdutosUseCase";


class ListarProdutosController {

    async handle(req: Request, res: Response) {
        const {
            id_marca,
            id_plataforma,
            nome,
            promocao,
        } = req.query;

        const listarProdutosUseCase = container.resolve(ListarProdutosUseCase);
        const lista = await listarProdutosUseCase.execute({
            id_marca: id_marca as string,
            id_plataforma: id_plataforma as string,
            nome: nome as string,
            promocao: promocao as unknown as boolean,
        });

        return res.json(lista);
    }
}

export { ListarProdutosController };
import { AppError } from "@errors/AppError";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { CriarPedidoUseCase } from "./CriarPedidoUseCase";

export class CriarPedidoController {
    async handle(req: Request, res: Response) {
        const { produtos } = req.body;
        const user_id = req.user.id;
        if (!Array.isArray(produtos)) {
            throw new AppError("Produtos deve ser um array de produtos", 400);
        }
        const criarPedidoUseCase = container.resolve(CriarPedidoUseCase);

        const pedido = await criarPedidoUseCase.execute({
            produtos,
            id_usuario: user_id
        })

        return res.json({
            id: pedido.id
        });
    }
}
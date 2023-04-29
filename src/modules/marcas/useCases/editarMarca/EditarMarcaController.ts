import { Request, Response } from "express";
import { container } from "tsyringe";
import { EditarMarcaUseCase } from "./EditarMarcaUseCase";


export class EditarMarcaController {

    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const {
            nome_marca
        } = req.body;

        const editarMarcaUseCase = container.resolve(EditarMarcaUseCase);

        const marcaAtualizada = await editarMarcaUseCase.execute({ id, nome_marca });

        return res.status(201).json(marcaAtualizada);
    }
}
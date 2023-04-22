import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListarMarcasUseCase } from "./ListarMarcasUseCase";

class ListarMarcasController {


    async handle(req: Request, res: Response) {
        const listarMarcasUseCase = container.resolve(ListarMarcasUseCase);

        const marcas = await listarMarcasUseCase.execute();

        res.status(200).json(marcas);
    }
}

export { ListarMarcasController };
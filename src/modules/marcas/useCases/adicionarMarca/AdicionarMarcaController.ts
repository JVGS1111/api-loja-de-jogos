import { Request, Response } from "express";
import { container } from "tsyringe";
import { AdicionarMarcaUseCase } from "./AdicionarMarcaUseCase";

class AdicionarMarcaController {

    async handle(req: Request, res: Response) {
        const { nome_marca } = req.body;

        const adicionarMarcaUseCase = container.resolve(AdicionarMarcaUseCase);

        const marca = await adicionarMarcaUseCase.execute(nome_marca);

        return res.status(201).json(marca);

    }
}

export { AdicionarMarcaController }
import { Request, Response } from "express";
import { AdicionarPlataformaUseCase } from "./AdicionarPlataformaUseCase";
import { container } from "tsyringe";

class AdicionarPlataformaController {
    async handle(req: Request, res: Response) {
        const {
            nome_plataforma,
            id_marca
        } = req.body;
        const adicionarPlataformaUseCase = container.resolve(AdicionarPlataformaUseCase);

        const plataforma = await adicionarPlataformaUseCase.execute({ nome_plataforma, id_marca });
        return res.status(201).json(plataforma);
    }
}

export { AdicionarPlataformaController };
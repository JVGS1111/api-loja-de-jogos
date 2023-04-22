import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListarPlataformasUseCase } from "./ListarPlataformasUseCase";


class ListarPlataformasController {

    async handle(req: Request, res: Response) {
        const listarPlataformasUseCase = container.resolve(ListarPlataformasUseCase);

        const lista = await listarPlataformasUseCase.execute();

        return res.json(lista);
    }
}

export { ListarPlataformasController };
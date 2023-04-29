import { Request, Response } from "express";
import { container } from "tsyringe";
import { ObterPerfilUseCase } from "./ObterPerfilUseCase";


export class ObterPerfilController {

    async handle(req: Request, res: Response) {
        const id = req.user.id;

        const obterPerfilUseCase = container.resolve(ObterPerfilUseCase);

        const usuario = await obterPerfilUseCase.execute(id);

        return res.json(usuario);
    }
}
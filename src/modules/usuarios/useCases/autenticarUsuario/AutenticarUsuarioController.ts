import { Request, Response } from "express";
import { container } from "tsyringe";
import { AutenticarUsuarioUseCase } from "./AutenticarUsuarioUseCase";


class AutenticarUsuarioController {
    async handle(req: Request, res: Response) {
        const {
            email,
            senha
        } = req.body;

        const autenticarUsuarioUseCase = container.resolve(AutenticarUsuarioUseCase);

        const data = await autenticarUsuarioUseCase.execute({ email, senha });

        return res.json(data);
    }
}

export { AutenticarUsuarioController }
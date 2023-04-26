import { Request, Response } from "express";
import { container } from "tsyringe";
import { CadastrarUsuarioUseCase } from "./CadastrarUsuarioUseCase";


class CadastrarUsuarioController {

    async handle(req: Request, res: Response) {
        const {
            nome,
            senha,
            confirmar_senha,
            email,
        } = req.body;

        const cadastrarUsuarioUseCase = container.resolve(CadastrarUsuarioUseCase);

        const usuario = await cadastrarUsuarioUseCase.execute({ nome, senha, confirmar_senha, email });

        return res.status(201).json(usuario);
    }
}

export { CadastrarUsuarioController };
import { AppError } from "@errors/AppError";
import { ICreateUsuarioDTO } from "@modules/usuarios/DTO/ICreateUsuarioDTO";
import { UsuariosRepository } from "@repositories/Usuarios/UsuariosRepository";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

export interface IRequest {
    nome: string,
    senha: string,
    confirmar_senha: string,
    email: string,
}

@injectable()
class CadastrarUsuarioUseCase {

    constructor(
        @inject("UsuariosRepository")
        private usuariosRepository: UsuariosRepository
    ) { }
    async execute({
        nome,
        senha,
        confirmar_senha,
        email
    }: IRequest) {

        if (senha !== confirmar_senha) {
            throw new AppError("Senha de confirmação não confere");
        }

        const usuarioExiste = await this.usuariosRepository.findUserByEmail(email);

        if (usuarioExiste) {
            throw new AppError("O email já está em uso");
        }


        const passwordHash = await hash(senha, 8);

        try {
            const user = await this.usuariosRepository.create({
                nome,
                senha: passwordHash,
                email
            })

            return user;
        } catch (err) {
            throw new Error(err.message);
        }

    }
}

export { CadastrarUsuarioUseCase };
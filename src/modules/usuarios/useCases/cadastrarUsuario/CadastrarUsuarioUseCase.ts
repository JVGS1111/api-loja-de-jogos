import auth from "@config/auth";
import { AppError } from "@errors/AppError";
import { IUsuariosRepository } from "@repositories/Usuarios/IUsuariosRepository";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IResponse {
    nome: string,
    email: string,
    token: string,
    id: string,
}

interface IRequest {
    nome: string,
    senha: string,
    confirmar_senha: string,
    email: string,
}

@injectable()
class CadastrarUsuarioUseCase {

    constructor(
        @inject("UsuariosRepository")
        private usuariosRepository: IUsuariosRepository
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
            });

            const {
                secret_token,
                expires_in_token
            } = auth;

            const token = sign({}, secret_token, {
                subject: user.id,
                expiresIn: expires_in_token
            })

            const tokenReturn: IResponse = {
                id: user.id,
                nome: user.nome,
                email: user.email,
                token: token,
            }

            return tokenReturn;
        } catch (err) {
            throw new Error(err.message);
        }

    }
}

export { CadastrarUsuarioUseCase };
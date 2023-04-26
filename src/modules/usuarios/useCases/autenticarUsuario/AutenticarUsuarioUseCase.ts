import auth from "@config/auth";
import { AppError } from "@errors/AppError";
import { IUsuariosRepository } from "@repositories/Usuarios/IUsuariosRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IRequest {
    email: string,
    senha: string
}

interface IResponse {
    token: string,
    user_id: string
}

@injectable()
class AutenticarUsuarioUseCase {

    constructor(
        @inject("UsuariosRepository")
        private usuariosRepository: IUsuariosRepository
    ) { }

    async execute({ email, senha }: IRequest) {
        const {
            secret_token,
            expires_in_token
        } = auth;
        const usuario = await this.usuariosRepository.findUserByEmail(email);

        if (!usuario) {
            throw new AppError("Usuario os senha inválidos");
        }

        const senhaConfere = await compare(senha, usuario.senha);

        if (!senhaConfere) {
            throw new AppError("Usuario os senha inválidos");
        }

        const token = sign({}, secret_token, {
            subject: usuario.id,
            expiresIn: expires_in_token
        })

        const tokenReturn: IResponse = {
            token: token,
            user_id: usuario.id
        }

        return tokenReturn;
    }
}

export { AutenticarUsuarioUseCase };
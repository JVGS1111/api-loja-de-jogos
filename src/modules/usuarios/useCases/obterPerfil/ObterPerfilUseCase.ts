import { AppError } from "@errors/AppError";
import { Usuario } from "@models/Usuario";
import { IUsuariosRepository } from "@repositories/Usuarios/IUsuariosRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ObterPerfilUseCase {

    constructor(
        @inject("UsuariosRepository")
        private usuariosRepository: IUsuariosRepository
    ) { }

    async execute(id) {
        const usuario = await this.usuariosRepository.findUserById(id);
        if (!usuario) {
            throw new AppError("Usuario não encontrado");
        }

        const usuarioFormatado = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        }

        return usuarioFormatado;
    }
}
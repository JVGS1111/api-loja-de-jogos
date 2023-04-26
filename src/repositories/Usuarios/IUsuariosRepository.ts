import { ICreateUsuarioDTO } from "@modules/usuarios/DTO/ICreateUsuarioDTO";
import { Usuario } from "models/Usuario";

export interface IUsuariosRepository {
    create({ nome, senha, email }: ICreateUsuarioDTO): Promise<Usuario>;
    findUserByEmail(email: string): Promise<Usuario>;
}
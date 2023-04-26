import { Repository } from "typeorm";
import { IUsuariosRepository } from "./IUsuariosRepository";
import { Usuario } from "models/Usuario";
import { dataSource } from "database";
import { ICreateUsuarioDTO } from "@modules/usuarios/DTO/ICreateUsuarioDTO";

class UsuariosRepository implements IUsuariosRepository {

    repository: Repository<Usuario>;

    constructor() {
        this.repository = dataSource.getRepository(Usuario);
    }

    async create({ nome, senha, email }: ICreateUsuarioDTO): Promise<Usuario> {
        const user = this.repository.create({
            nome,
            senha,
            email
        });

        await this.repository.save(user);

        return user;
    }

    async findUserByEmail(email: string): Promise<Usuario> {
        const usuario = await this.repository.findOneBy({ email });

        return usuario;
    }
}

export { UsuariosRepository };
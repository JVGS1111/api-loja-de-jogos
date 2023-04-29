import { Repository } from "typeorm";
import { IMarcasRepository } from "./IMarcasRepository";
import { Marca } from "models/Marca";
import { dataSource } from "database";


class MarcasRepository implements IMarcasRepository {

    repository: Repository<Marca>

    constructor() {
        this.repository = dataSource.getRepository(Marca)
    }

    async create(nome_marca: string): Promise<Marca> {
        const marca = this.repository.create({ nome_marca });

        await this.repository.save(marca);

        return marca;
    }

    async list(): Promise<Marca[]> {
        const lista = await this.repository.find();

        return lista
    }

    async findById(id: string): Promise<Marca> {
        const marca = await this.repository.findOneBy({ id: id });

        return marca
    }

    async findByName(nome_marca: string): Promise<Marca> {
        const marca = await this.repository.findOneBy({ nome_marca: nome_marca });

        return marca;
    }

    async editMarca(id: any, nome_marca: string): Promise<Marca> {
        const result = await this.repository.createQueryBuilder()
            .update(Marca)
            .set({ nome_marca: nome_marca })
            .where("id = :id", { id })
            .returning(["id", "nome_marca"])
            .execute();

        const marcaAtualizada = result.raw as Marca[];

        return marcaAtualizada[0];
    }
}

export { MarcasRepository };
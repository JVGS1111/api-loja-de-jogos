import { Plataforma } from "models/Plataforma";
import { IPlataformasRepository } from "./IPlataformasRepository";
import { ICreatePlataformaDTO } from "./ICreatePlataformaDTO";
import { Repository } from "typeorm";
import { dataSource } from "database";


class PlataformasRepository implements IPlataformasRepository {

    private repository: Repository<Plataforma>;

    constructor() {
        this.repository = dataSource.getRepository(Plataforma);
    }

    async create({ id_marca, nome_plataforma }: ICreatePlataformaDTO): Promise<Plataforma> {
        const plataforma = this.repository.create({
            nome_plataforma,
            id_marca
        });

        await this.repository.save(plataforma);

        return plataforma;
    }

    async list(): Promise<Plataforma[]> {
        const lista = await this.repository.find({
            relations: ["marca"]
        });

        return lista;
    }

    async findByName(nome_plataforma: string): Promise<Plataforma> {
        const plataforma = await this.repository.findOne({
            where: { nome_plataforma },
        });

        return plataforma;
    }

    async findById(id: string): Promise<Plataforma> {
        const plataforma = await this.repository.findOne({
            where: { id: id },
            relations: ["marca"]
        });

        return plataforma;
    }
}

export { PlataformasRepository };
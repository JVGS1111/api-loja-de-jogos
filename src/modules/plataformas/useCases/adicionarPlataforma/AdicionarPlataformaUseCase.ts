import { AppError } from "@errors/AppError";
import { IMarcasRepository } from "@repositories/Marcas/IMarcasRepository";
import { ICreatePlataformaDTO } from "@repositories/Plataformas/ICreatePlataformaDTO";
import { Plataforma } from "models/Plataforma";
import { IPlataformasRepository } from "repositories/Plataformas/IPlataformasRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class AdicionarPlataformaUseCase {

    constructor(
        @inject("PlataformasRepository")
        private plataformasRepository: IPlataformasRepository,
        @inject("MarcasRepository")
        private marcasRepository: IMarcasRepository
    ) { }

    async execute(dados: ICreatePlataformaDTO): Promise<Plataforma> {

        const marcaExiste = await this.marcasRepository.findById(dados.id_marca);

        if (!marcaExiste) {
            throw new AppError("A marca não foi encontrada");
        }

        const plataformaExiste = await this.plataformasRepository.findByName(dados.nome_plataforma);

        if (plataformaExiste) {
            throw new AppError("Já existe uma plataforma cadastrada com este nome");
        }

        const novaPlat = await this.plataformasRepository.create(dados);
        return novaPlat;
    }
}

export { AdicionarPlataformaUseCase };
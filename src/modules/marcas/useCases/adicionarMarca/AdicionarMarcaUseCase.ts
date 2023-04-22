import { AppError } from "@errors/AppError";
import { IMarcasRepository } from "@repositories/Marcas/IMarcasRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class AdicionarMarcaUseCase {

    constructor(
        @inject("MarcasRepository")
        private marcasRepository: IMarcasRepository
    ) { }

    async execute(nome_marca: string) {
        const marcaExiste = await this.marcasRepository.findByName(nome_marca);

        if (marcaExiste) {
            throw new AppError("Uma marca com este nome já existe");
        }

        const marca = await this.marcasRepository.create(nome_marca);

        return marca
    }
}

export { AdicionarMarcaUseCase };
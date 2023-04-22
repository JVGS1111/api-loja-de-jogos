import { IMarcasRepository } from "@repositories/Marcas/IMarcasRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class ListarMarcasUseCase {

    constructor(
        @inject("MarcasRepository")
        private marcasRepository: IMarcasRepository
    ) { }

    async execute() {
        const marcas = await this.marcasRepository.list();

        return marcas
    }
}
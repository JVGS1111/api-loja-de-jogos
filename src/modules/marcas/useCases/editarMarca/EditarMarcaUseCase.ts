import { AppError } from "@errors/AppError";
import { IMarcasRepository } from "@repositories/Marcas/IMarcasRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    id: string,
    nome_marca: string
}
@injectable()
export class EditarMarcaUseCase {

    constructor(
        @inject("MarcasRepository")
        private marcaRepository: IMarcasRepository
    ) { }
    async execute({
        id,
        nome_marca
    }: IRequest) {
        const marca = await this.marcaRepository.findById(id);

        if (!marca) {
            throw new AppError("Marca não encontrada");
        }

        const marcaEditada = await this.marcaRepository.editMarca(id, nome_marca);

        return marcaEditada;
    }
}
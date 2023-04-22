import { IPlataformasRepository } from "@repositories/Plataformas/IPlataformasRepository";
import { Plataforma } from "models/Plataforma";
import { inject, injectable } from "tsyringe";


@injectable()
class ListarPlataformasUseCase {

    constructor(
        @inject("PlataformasRepository")
        private plataformasRepository: IPlataformasRepository
    ) { }

    async execute(): Promise<Plataforma[]> {
        const lista = await this.plataformasRepository.list();

        return lista;
    }
}

export { ListarPlataformasUseCase };
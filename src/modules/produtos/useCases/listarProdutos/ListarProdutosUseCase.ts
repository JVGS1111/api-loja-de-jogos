import { ProdutosRepository } from "@repositories/Produtos/ProdutosRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    id_marca?: string,
    id_plataforma?: string,
    nome?: string
    promocao?: boolean,
}

@injectable()
class ListarProdutosUseCase {

    constructor(
        @inject("ProdutosRepository")
        private produtosRespository: ProdutosRepository
    ) { }

    async execute({
        id_marca,
        id_plataforma,
        nome,
        promocao
    }: IRequest) {
        const lista = await this.produtosRespository.list(
            id_marca,
            id_plataforma,
            nome,
            promocao,
        );

        return lista
    }
}

export { ListarProdutosUseCase }
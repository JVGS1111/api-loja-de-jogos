import { AppError } from "@errors/AppError";
import { IProdutosRepository } from "@repositories/Produtos/IProdutosRepository";
import { inject, injectable } from "tsyringe";


@injectable()
export class ObterProdutoUseCase {

    constructor(
        @inject("ProdutosRepository")
        private produtosRepository: IProdutosRepository
    ) { }

    async execute(id) {
        const produto = await this.produtosRepository.findByProductId(id, true);

        if (!produto) {
            throw new AppError("Produto não encontrado");
        }

        return produto;
    }
}
import { inject, injectable } from "tsyringe";
import { ICadastrarProdutoDTO } from "./CadastrarProdutoDTO";
import { ProdutosRepository } from "@repositories/Produtos/ProdutosRepository";

@injectable()
class CadastrarProdutoUseCase {

    constructor(
        @inject("ProdutosRepository")
        private produtosRepository: ProdutosRepository
    ) { }

    async execute({
        descricao_produto,
        id_plataforma,
        id_marca,
        nome_produto,
        preco,
        quantidade,
        disponivel
    }: ICadastrarProdutoDTO) {
        //verificar se marca e plataforma existem
        const produto = await this.produtosRepository.create({
            descricao_produto,
            id_marca,
            id_plataforma,
            disponivel,
            preco,
            nome_produto,
            quantidade
        });

        return produto
    }
}

export { CadastrarProdutoUseCase }
import { inject, injectable } from "tsyringe";
import { ICadastrarProdutoDTO } from "./CadastrarProdutoDTO";
import { ProdutosRepository } from "@repositories/Produtos/ProdutosRepository";
import { PlataformasRepository } from "@repositories/Plataformas/PlataformasRepository";
import { AppError } from "@errors/AppError";

@injectable()
class CadastrarProdutoUseCase {

    constructor(
        @inject("ProdutosRepository")
        private produtosRepository: ProdutosRepository,
        @inject("PlataformasRepository")
        private plataformasRepository: PlataformasRepository
    ) { }

    async execute({
        descricao_produto,
        id_plataforma,
        nome_produto,
        preco,
        quantidade,
        disponivel
    }: ICadastrarProdutoDTO) {
        //verificar se marca e plataforma existem
        const plataforma = await this.plataformasRepository.findById(id_plataforma);

        if (!plataforma) {
            throw new AppError("Plataforma informada não existe");
        }

        const produto = await this.produtosRepository.create({
            descricao_produto,
            id_marca: plataforma.id_marca,
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
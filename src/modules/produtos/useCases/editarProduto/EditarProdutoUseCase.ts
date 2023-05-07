import { AppError } from "@errors/AppError";
import { IEditarProdutoDTO } from "@modules/produtos/DTO/IEditarProdutoDTO";
import { IPlataformasRepository } from "@repositories/Plataformas/IPlataformasRepository";
import { IProdutosRepository } from "@repositories/Produtos/IProdutosRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class EditarProdutoUseCase {

    constructor(
        @inject("ProdutosRepository")
        private produtosRespository: IProdutosRepository,
        @inject("PlataformasRepository")
        private plataformasRepository: IPlataformasRepository
    ) { }

    async execute({
        id,
        nome_produto,
        descricao_produto,
        id_plataforma,
        preco,
        quantidade,
        disponivel,
        promocao,
        porcentagem_promocao
    }: IEditarProdutoDTO) {

        if (preco <= 0) {
            throw new AppError("Preço inválido");
        }

        const produto = await this.produtosRespository.findByProductId(id);

        if (!produto) {
            throw new AppError("Produto não encontrado");
        }

        const plataforma = await this.plataformasRepository.findById(id_plataforma);

        if (!plataforma) {
            throw new AppError("Plataforma informada não existe");
        }

        const modelProduto: IEditarProdutoDTO = {
            id,
            nome_produto,
            descricao_produto,
            id_plataforma,
            preco,
            quantidade,
            disponivel,
            id_marca: plataforma.id_marca,
            promocao,
            porcentagem_promocao
        }

        if (quantidade <= 0) {
            modelProduto.quantidade = 0;
            modelProduto.disponivel = false;
        }

        if (promocao) {
            if (porcentagem_promocao < 5 ||
                porcentagem_promocao > 95
            ) {
                throw new AppError("Porcentagem de promoção inválida");
            }
            const valor_promocao = this.calcPromotion(preco, porcentagem_promocao);
            modelProduto.valor_promocao = valor_promocao;
        }

        const novoProduto = await this.produtosRespository.edit(modelProduto);

        return novoProduto;
    }

    private calcPromotion(prodValue, promoValue) {
        const result = prodValue - (prodValue * (promoValue / 100));
        return Number(result.toFixed(2));
    }

}
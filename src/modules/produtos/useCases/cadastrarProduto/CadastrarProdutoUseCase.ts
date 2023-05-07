import { inject, injectable } from "tsyringe";
import { ICadastrarProdutoDTO } from "./CadastrarProdutoDTO";
import { AppError } from "@errors/AppError";
import { IPlataformasRepository } from "@repositories/Plataformas/IPlataformasRepository";
import { IProdutosRepository } from "@repositories/Produtos/IProdutosRepository";

@injectable()
class CadastrarProdutoUseCase {

    constructor(
        @inject("ProdutosRepository")
        private produtosRepository: IProdutosRepository,
        @inject("PlataformasRepository")
        private plataformasRepository: IPlataformasRepository
    ) { }

    async execute({
        descricao_produto,
        id_plataforma,
        nome_produto,
        preco,
        quantidade,
        disponivel
    }: ICadastrarProdutoDTO) {

        if (preco <= 0) {
            throw new AppError("Preço inválido");
        }

        const plataforma = await this.plataformasRepository.findById(id_plataforma);

        if (!plataforma) {
            throw new AppError("Plataforma informada não existe");
        }
        const model: ICadastrarProdutoDTO = {
            descricao_produto,
            id_marca: plataforma.id_marca,
            id_plataforma,
            disponivel,
            preco,
            nome_produto,
            quantidade
        }

        if (quantidade <= 0) {
            model.quantidade = 0;
            model.disponivel = false;
        }
        const produto = await this.produtosRepository.create(model);

        return produto
    }
}

export { CadastrarProdutoUseCase }
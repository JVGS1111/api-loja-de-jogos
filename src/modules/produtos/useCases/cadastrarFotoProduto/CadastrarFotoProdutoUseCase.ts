import { AppError } from "@errors/AppError";
import { IProdutosRepository } from "@repositories/Produtos/IProdutosRepository";
import { IProdutosImagesRepository } from "@repositories/ProdutosImages/IProdutosImagesRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
    id_produto: string,
    nome_imagens: string[]
}

@injectable()
export class CadastrarFotoProdutoUseCase {

    constructor(
        @inject("ProdutosImagesRepository")
        private produtosImagensRepository: IProdutosImagesRepository,
        @inject("ProdutosRepository")
        private produtosRepository: IProdutosRepository
    ) { }

    async execute({ id_produto, nome_imagens }: IRequest) {

        const produto = await this.produtosRepository.findByProductId(id_produto);

        if (!produto) {
            throw new AppError("Produto não encontrado");
        }
        const listaImagens = await this.produtosImagensRepository.listByProductId(id_produto);

        const quantidadeImagensCadastradas = listaImagens.length + nome_imagens.length;

        if (quantidadeImagensCadastradas > 5) {
            throw new AppError("Limite de imagens por produto é 5");
        }

        nome_imagens.map(async (imagem) => {
            await this.produtosImagensRepository.create(id_produto, imagem);
        });
    }
}
import { Repository } from "typeorm";
import { IProdutosImagesRepository } from "./IProdutosImagesRepository";
import { ProdutoImagens } from "@models/ProdutoImagens";
import { dataSource } from "@database/index";

export class ProdutosImagesRepository implements IProdutosImagesRepository {

    repository: Repository<ProdutoImagens> = null;

    constructor() {
        this.repository = dataSource.getRepository(ProdutoImagens);
    }
    async create(id_produto, imagem) {
        const imagemProduto = this.repository.create({
            id_produto,
            nome_imagem: imagem
        })

        await this.repository.save(imagemProduto);
        return imagemProduto;
    }

    async listByProductId(id_produto: string): Promise<ProdutoImagens[]> {
        const lista = await this.repository.findBy({ id_produto: id_produto });

        return lista;
    }
}
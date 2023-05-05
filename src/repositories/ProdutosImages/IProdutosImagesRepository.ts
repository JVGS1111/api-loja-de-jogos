import { ProdutoImagens } from "@models/ProdutoImagens"

export interface IProdutosImagesRepository {
    create(id_produto: string, imagem: string): Promise<ProdutoImagens>;
    listByProductId(id_produto: string): Promise<ProdutoImagens[]>;
    del(id: string): Promise<void>;
    findImageById(id: string): Promise<ProdutoImagens>;
}
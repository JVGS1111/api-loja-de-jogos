import { IEditarProdutoDTO } from "@modules/produtos/DTO/IEditarProdutoDTO";
import { ICadastrarProdutoDTO } from "@modules/produtos/useCases/cadastrarProduto/CadastrarProdutoDTO";
import { Produto } from "models/Produto";


export interface IProdutosRepository {
    create(data: ICadastrarProdutoDTO): Promise<Produto>;
    list(id_marca?: string, id_plataforma?: string, nome?: string, promocao?: boolean): Promise<Produto[]>;
    findByProductId(id: string, relation?: boolean): Promise<Produto>;
    edit(data: IEditarProdutoDTO): Promise<Produto>;
}
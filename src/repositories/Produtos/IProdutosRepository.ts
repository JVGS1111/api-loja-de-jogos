import { ICadastrarProdutoDTO } from "@modules/produtos/useCases/cadastrarProduto/CadastrarProdutoDTO";
import { Produto } from "models/Produto";


export interface IProdutosRepository {
    create(data: ICadastrarProdutoDTO): Promise<Produto>
    list(id_marca?: string, id_plataforma?: string, nome?: string, promocao?: boolean): Promise<Produto[]>
}
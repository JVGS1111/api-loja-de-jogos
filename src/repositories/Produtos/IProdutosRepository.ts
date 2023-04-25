import { ICadastrarProdutoDTO } from "@modules/produtos/useCases/cadastrarProduto/CadastrarProdutoDTO";


export interface IProdutosRepository {
    create(data: ICadastrarProdutoDTO): Promise<any>
    list(): Promise<any>
}
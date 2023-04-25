import { ICadastrarProdutoDTO } from "@modules/produtos/useCases/cadastrarProduto/CadastrarProdutoDTO";
import { IProdutosRepository } from "./IProdutosRepository";
import { Repository } from "typeorm";
import { Produto } from "models/Produto";
import { dataSource } from "database";


class ProdutosRepository implements IProdutosRepository {

    repository: Repository<Produto>;
    constructor() {
        this.repository = dataSource.getRepository(Produto);
    }

    async create({
        descricao_produto,
        id_plataforma,
        nome_produto,
        preco,
        quantidade,
        id_marca,
        disponivel
    }: ICadastrarProdutoDTO): Promise<any> {
        const produto = this.repository.create({
            descricao: descricao_produto,
            id_plataforma: id_plataforma,
            nome: nome_produto,
            preco: preco,
            quantidade: quantidade,
            id_marca: id_marca,
            disponivel: disponivel
        });

        await this.repository.save(produto);

        return produto;
    }

    async list(): Promise<any> {
        const lista = await this.repository.find();

        return lista;
    }
}

export { ProdutosRepository };
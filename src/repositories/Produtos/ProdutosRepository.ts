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
    }: ICadastrarProdutoDTO): Promise<Produto> {
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

    async list(
        id_marca?: string,
        id_plataforma?: string,
        nome?: string,
        promocao?: boolean,
    ): Promise<Produto[]> {
        const produtosQuary = this.repository.createQueryBuilder("query");

        if (id_marca) {
            produtosQuary.andWhere("id_marca = :id_marca", { id_marca });
        }
        if (id_plataforma) {
            produtosQuary.andWhere("id_plataforma = :id_plataforma", { id_plataforma });
        }
        if (promocao) {
            produtosQuary.andWhere("promocao = :promocao", { promocao });
        }
        if (nome) {
            produtosQuary.andWhere("nome ILIKE :nome", { nome: `%${nome}%` });
        }

        const lista = await produtosQuary
            .leftJoinAndSelect("query.plataforma", "plataforma")
            .leftJoinAndSelect("query.marca", "marca")
            .getMany()

        return lista;
    }
}

export { ProdutosRepository };
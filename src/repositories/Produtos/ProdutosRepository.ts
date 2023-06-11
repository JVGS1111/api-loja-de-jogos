import { ICadastrarProdutoDTO } from "@modules/produtos/useCases/cadastrarProduto/CadastrarProdutoDTO";
import { IProdutosRepository } from "./IProdutosRepository";
import { Repository } from "typeorm";
import { Produto } from "models/Produto";
import { dataSource } from "database";
import { ProdutoImagens } from "@models/ProdutoImagens";
import { IEditarProdutoDTO } from "@modules/produtos/DTO/IEditarProdutoDTO";

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
        disponivel,
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
    ): Promise<any[]> {
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
            .leftJoinAndMapMany("query.fotos", ProdutoImagens, "imagens", "query.id = imagens.id_produto")
            .getMany();

        return lista;
    }


    async findByProductId(id: string, relation = false): Promise<Produto> {
        const produtoQuery = this.repository.createQueryBuilder("query");

        if (relation) {
            produtoQuery
                .leftJoinAndSelect("query.plataforma", "plataforma")
                .leftJoinAndSelect("query.marca", "marca")
                .leftJoinAndMapMany("query.fotos", ProdutoImagens, "imagens", "query.id = imagens.id_produto")
        }

        const prod = await produtoQuery.where("query.id = :id", { id }).getOne();
        return prod;
    }

    async edit(data: IEditarProdutoDTO): Promise<Produto> {
        const result = await this.repository.createQueryBuilder()
            .update(Produto)
            .set({
                nome: data.nome_produto,
                descricao: data.descricao_produto,
                id_plataforma: data.id_plataforma,
                preco: data.preco,
                quantidade: data.quantidade,
                disponivel: data.disponivel,
                id_marca: data.id_marca,
                promocao: data.promocao,
                porcentagem_promocao: data.porcentagem_promocao,
                valor_promocao: data.valor_promocao
            })
            .where("id = :id", { id: data.id })
            .returning([
                "id",
                "nome",
                "descricao",
                "id_plataforma",
                "preco",
                "quantidade",
                "disponivel",
                "id_marca",
                "promocao",
                "porcentagem_promocao",
                "valor_promocao"
            ])
            .execute();

        const produtoAtt = result.raw as Produto[];
        return produtoAtt[0];
    }

    async reduzirQuantidade(id: string, qtd: number): Promise<void> {
        await this.repository.update(id, {
            quantidade: qtd
        });
    }
}

export { ProdutosRepository };
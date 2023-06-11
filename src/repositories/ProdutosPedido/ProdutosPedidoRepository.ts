import { ProdutoPedido } from "@models/ProdutosPedido";
import { IProdutosPedidoRepository } from "./IProdutosPedidoRepository";
import { Repository } from "typeorm";
import { dataSource } from "@database/index";

export class ProdutosPedidoRepository implements IProdutosPedidoRepository {

    repository: Repository<ProdutoPedido>

    constructor() {
        this.repository = dataSource.getRepository(ProdutoPedido);
    }

    async create(pedido_id: string, produto_id: string, quantidade: number, valor_unidade: number): Promise<ProdutoPedido> {
        const prodPedido = this.repository.create({
            quantidade: quantidade,
            produto_id: produto_id,
            valor_unidade: valor_unidade,
            pedido_id: pedido_id
        });

        await this.repository.save(prodPedido);

        return prodPedido;
    }
}
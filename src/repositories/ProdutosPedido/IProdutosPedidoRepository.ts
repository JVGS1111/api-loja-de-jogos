import { ProdutoPedido } from "@models/ProdutosPedido";

export interface IProdutosPedidoRepository {
    create(pedido_id: string, produto_id: string, quantidade: number, valor_unidade: number): Promise<ProdutoPedido>;
}
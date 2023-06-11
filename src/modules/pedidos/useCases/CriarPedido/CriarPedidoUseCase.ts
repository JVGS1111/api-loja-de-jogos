import { AppError } from "@errors/AppError";
import { IPedidosRespository } from "@repositories/Pedidos/IPedidosRepository";
import { IProdutosRepository } from "@repositories/Produtos/IProdutosRepository";
import { IProdutosPedidoRepository } from "@repositories/ProdutosPedido/IProdutosPedidoRepository";
import { inject, injectable } from "tsyringe";

interface IProdutos {
    id: string,
    quantidade: number,
}

interface IRequest {
    produtos: IProdutos[],
    id_usuario: string,
}

@injectable()
export class CriarPedidoUseCase {

    constructor(
        @inject("ProdutosRepository")
        private produtosRepository: IProdutosRepository,
        @inject("PedidosRepository")
        private pedidosRepository: IPedidosRespository,
        @inject("ProdutosPedidoRepository")
        private produtosPedidoRepository: IProdutosPedidoRepository,
    ) { }

    async execute(req: IRequest) {
        const { produtos, id_usuario } = req;
        let valorTotal = 0;

        for (let prod of produtos) {
            const p = await this.produtosRepository.findByProductId(prod.id);
            if (p.quantidade < prod.quantidade) {
                throw new AppError(`Quantidade indisponível do produto ${p.nome}`, 400);
            } else {
                const valorProduto = p.promocao ? p.valor_promocao : p.preco;
                valorTotal += valorProduto * prod.quantidade;
            }
        }

        const pedido = await this.pedidosRepository.create(valorTotal, id_usuario);
        for (let prod of produtos) {
            const p = await this.produtosRepository.findByProductId(prod.id);
            const qtdFinal = p.quantidade - prod.quantidade;
            const valorProduto = p.promocao ? p.valor_promocao : p.preco;
            await this.produtosPedidoRepository.create(pedido.id, prod.id, prod.quantidade, valorProduto);
            await this.produtosRepository.reduzirQuantidade(p.id, qtdFinal);
        }

        return pedido;
    }
}

// receber array com os produtos
// verificar se tem disponivel  - feito
// somar total a pagar - feito
// registrar o pedido com o valor a pagar
// deduzir quantidades
// salvar os produtos no banco
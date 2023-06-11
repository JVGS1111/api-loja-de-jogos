import { Pedido } from "@models/Pedido";

export interface IPedidosRespository {
    create(total: number, usuario_id: string): Promise<Pedido>;
}
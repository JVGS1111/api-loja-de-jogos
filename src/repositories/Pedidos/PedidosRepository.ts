import { Repository } from "typeorm";
import { IPedidosRespository } from "./IPedidosRepository";
import { Pedido } from "@models/Pedido";
import { dataSource } from "@database/index";

export class PedidosRepository implements IPedidosRespository {

    repository: Repository<Pedido>

    constructor() {
        this.repository = dataSource.getRepository(Pedido);
    }

    async create(total: number, usuario_id: string): Promise<Pedido> {
        const pedido = this.repository.create({
            status: "aguardando",
            total: total,
            usuario_id: usuario_id
        })

        await this.repository.save(pedido);

        return pedido;
    }
}
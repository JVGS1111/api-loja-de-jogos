import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("pedidos")
class Pedido {
    @PrimaryColumn()
    id: string;

    @Column()
    usuario_id: string;

    @Column()
    total: number;

    @Column()
    status: string;

    @Column()
    data_pagamento: Date;

    @Column()
    data_envio: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
            this.status = "aguardando"
        }
    }
}

export { Pedido };
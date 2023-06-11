import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Produto } from "./Produto";

@Entity("pedidos_produtos")
class ProdutoPedido {
    @PrimaryColumn()
    id: string;

    @Column()
    pedido_id: string;

    @Column()
    produto_id: string;

    @OneToOne(() => Produto)
    @JoinColumn({ name: "produto_id" })
    produto: Produto;

    @Column()
    quantidade: number;

    @Column()
    valor_unidade: number;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { ProdutoPedido };
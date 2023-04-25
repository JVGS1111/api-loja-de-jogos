import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Plataforma } from "./Plataforma";
import { Marca } from "./Marca";

@Entity('produtos')
class Produto {

    @PrimaryColumn()
    id: string;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @Column()
    preco: number;

    @Column()
    quantidade: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Plataforma)
    @JoinColumn({ name: "id_plataforma" })
    plataforma: Plataforma;

    @ManyToOne(() => Marca)
    @JoinColumn({ name: "id_marca" })
    marca: Marca;

    @Column()
    id_plataforma: string;

    @Column()
    id_marca: string;

    @Column()
    disponivel: boolean;

    @Column()
    promocao: boolean;

    @Column()
    porcentagem_promocao: number;

    @Column()
    valor_promocao: number;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Produto }


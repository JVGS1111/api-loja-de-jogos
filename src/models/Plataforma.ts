import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Marca } from "./Marca";

@Entity("plataformas")
class Plataforma {

    @PrimaryColumn()
    id: string;

    @Column()
    nome_plataforma: string;

    @Column()
    id_marca: string;

    @ManyToOne(() => Marca)
    @JoinColumn({ name: "id_marca" })
    marca: Marca;

    @CreateDateColumn()
    created_at: Date;

    constructor() {

        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Plataforma };
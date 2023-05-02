import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("imagens_produtos")
export class ProdutoImagens {

    @PrimaryColumn()
    id: string;

    @Column()
    nome_imagem: string;

    @Column()
    id_produto: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}
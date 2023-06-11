import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class PedidosProdutos1685287546416 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: "pedidos_produtos",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "pedido_id",
                        type: "uuid",
                    },
                    {
                        name: "produto_id",
                        type: "uuid",
                    },
                    {
                        name: "quantidade",
                        type: "numeric",
                    },
                    {
                        name: "valor_unidade",
                        type: "numeric"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKPedidoId",
                        referencedTableName: "pedidos",
                        referencedColumnNames: ["id"],
                        columnNames: ["pedido_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKProdutoId",
                        referencedTableName: "produtos",
                        referencedColumnNames: ["id"],
                        columnNames: ["produto_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("pedidos_produtos");
    }

}

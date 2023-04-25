import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Produtos1682203921042 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "produtos",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "nome",
                        type: "varchar",
                    },
                    {
                        name: "descricao",
                        type: "varchar"
                    },
                    {
                        name: "preco",
                        type: "numeric"
                    },
                    {
                        name: "quantidade",
                        type: "numeric"
                    },
                    {
                        name: "id_plataforma",
                        type: "uuid",
                    },
                    {
                        name: "id_marca",
                        type: "uuid",
                    },
                    {
                        name: "disponivel",
                        type: "boolean",
                        default: "true"
                    },
                    {
                        name: "promocao",
                        type: "boolean",
                        default: "false"
                    },
                    {
                        name: "porcentagem_promocao",
                        type: "numeric",
                        isNullable: true
                    },
                    {
                        name: "valor_promocao",
                        type: "numeric",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    },

                ],
                foreignKeys: [
                    {
                        name: "FKProdutoPlataforma",
                        referencedTableName: "plataformas",
                        referencedColumnNames: ["id"],
                        columnNames: ["id_plataforma"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKProdutoMarca",
                        referencedTableName: "marcas",
                        referencedColumnNames: ["id"],
                        columnNames: ["id_marca"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("produtos");
    }

}

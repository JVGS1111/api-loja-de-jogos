import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class ImagensProdutos1682805160889 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "imagens_produtos",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "nome_imagem",
                        type: "varchar"
                    },
                    {
                        name: "id_produto",
                        type: "uuid"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKImagemProduto",
                        referencedTableName: "produtos",
                        referencedColumnNames: ["id"],
                        columnNames: ["id_produto"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("imagens_produtos");
    }

}

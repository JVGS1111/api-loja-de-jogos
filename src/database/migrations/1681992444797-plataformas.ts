import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Plataformas1681992444797 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "plataformas",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "id_marca",
                        type: "uuid",
                        isNullable: true
                    },
                    {
                        name: "nome_plataforma",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "FKMarcaPlataforma",
                        referencedTableName: "marcas",
                        referencedColumnNames: ["id"],
                        columnNames: ["id_marca"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("plataformas");
    }

}

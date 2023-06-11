import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Pedidos1685287541433 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "pedidos",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "usuario_id",
                        type: "uuid",
                    },
                    {
                        name: "total",
                        type: "numeric"
                    },
                    {
                        name: "status",
                        type: "varchar",
                    },
                    {
                        name: "data_pagamento",
                        type: "timestamp",
                        isNullable: true
                    },
                    {
                        name: "data_envio",
                        type: "timestamp",
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
                        name: "FKUserId",
                        referencedTableName: "usuarios",
                        referencedColumnNames: ["id"],
                        columnNames: ["usuario_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("pedidos");
    }

}

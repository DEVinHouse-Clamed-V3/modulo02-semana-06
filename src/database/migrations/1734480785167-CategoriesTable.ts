import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CategoriesTable1734480785167 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
         await queryRunner.createTable(
            new Table(
                {
                    name: 'categories',
                    columns: [
                        {
                            name: 'id',
                            isPrimary: true,
                            type: 'serial'
                        },
                        {
                            name: 'name',
                            type: 'varchar',
                            length: "150"
                        },
                    ]
                }
            )
         )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('categories')
    }

}

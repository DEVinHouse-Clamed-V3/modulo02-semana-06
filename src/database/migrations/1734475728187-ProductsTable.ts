import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class ProductsTable1734475728187 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.createTable(
            new Table(
                {
                    name: 'products',
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
                        {
                            name: 'price',
                            type: 'decimal',
                            precision: 10,
                            scale: 2
                        },
                        {
                           name: 'brand',
                           type: 'varchar',
                           length: "50" 
                        },
                        {
                            name: 'description',
                            type: 'text' 
                        },
                        {
                            name: 'status',
                            type: 'boolean',
                            default: true
                        }
                    ]
                }
            ), true
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products')
    }

}

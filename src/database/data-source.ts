import "reflect-metadata"
import { DataSource } from "typeorm"
import { Product } from "../entities/Product"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "loja",
    logging: true,
    entities: [Product],
    migrations: ["src/database/migrations/*.ts"]
})

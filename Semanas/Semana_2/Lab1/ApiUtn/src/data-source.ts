import "reflect-metadata"
import { DataSource } from "typeorm"
import { Cliente } from "./entity/Cliente"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "8908",
    database: "prueba_utn",
    synchronize: true,
    logging: false,
    entities: [Cliente],
    migrations: [],
    subscribers: [],
})

import "reflect-metadata"
import { DataSource } from "typeorm"
import { Cliente } from "./entity/Cliente"
import { DetalleFactura } from "./entity/DetalleFactura"
import { CabeceraFactura } from "./entity/CabeceraFactura"
import { Producto } from "./entity/Producto"
import { Proveedor } from "./entity/Proveedor"
import { Vendedor } from "./entity/Vendedor"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "8908",
    database: "prueba_utn",
    synchronize: true,
    logging: false,
    entities: [Cliente, DetalleFactura,CabeceraFactura, Producto,Proveedor,Vendedor],
    migrations: [],
    subscribers: [],
})

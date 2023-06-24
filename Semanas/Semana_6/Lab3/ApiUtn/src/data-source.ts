import "reflect-metadata";
import { DataSource } from "typeorm";
import { Cliente } from "./entity/Cliente";
import { CabeceraFactura } from "./entity/CabeceraFactura";
import { Producto } from "./entity/Producto";
import { Proveedor } from "./entity/Proveedor";
import { Vendedor } from "./entity/Vendedor";
import { Usuario } from "./entity/Usuario";
import { DetalleFactura } from "./entity/DetalleFactura";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "8908",
  database: "prueba_utn",
  synchronize: true,
  logging: false,
  entities: [
    Cliente,
    CabeceraFactura,
    Producto,
    Proveedor,
    Vendedor,
    Usuario,
    DetalleFactura,
  ],
  migrations: [],
  subscribers: [],
});

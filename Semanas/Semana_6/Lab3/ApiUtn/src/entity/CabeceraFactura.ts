import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { Cliente } from "./Cliente";
import { Vendedor } from "./Vendedor";
import { Producto } from "./Producto";
import Productos_Controller from "../controller/Clientes_Controller";
import { DetalleFactura } from "./DetalleFactura";

@Entity()
export class CabeceraFactura {
  @PrimaryColumn({ type: "int", nullable: false })
  Numero: number;
  @OneToMany(() => DetalleFactura, (detalles) => detalles.cabecera)
  detalles: DetalleFactura[];
  @Column({ type: "date", nullable: false })
  fecha: Date;
  @OneToOne((type) => Cliente, {
    eager: true,
    cascade: true,
    nullable: false,
  })
  @JoinColumn({ name: "Cedula_Cliente" })
  cliente: Cliente;
  @OneToOne((type) => Vendedor, {
    eager: true,
    cascade: true,
    nullable: false,
  })
  @JoinColumn({ name: "Codigo_Vendedor" })
  vendedor: Vendedor;
}

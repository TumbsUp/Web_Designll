import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
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
  @OneToMany(() => DetalleFactura, (detalles) => detalles.cabecera, {
    cascade: ["insert", "update"],
  })
  detalles: DetalleFactura[];
  @Column({ type: "date", nullable: false })
  fecha: Date;
  @ManyToOne((type) => Cliente, {
    cascade: true,
  })
  @JoinColumn({ name: "Cedula_Cliente" })
  cliente: Cliente;
  @ManyToOne((type) => Vendedor, {
    eager: false,
    cascade: true,
    nullable: false,
  })
  @JoinColumn({ name: "Codigo_Vendedor" })
  vendedor: Vendedor;
  @Column({ default: true })
  estado: boolean;
}

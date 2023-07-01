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
import { CabeceraFactura } from "./CabeceraFactura";
import { Producto } from "./Producto";

@Entity()
export class DetalleFactura {
  @Column({ primary: true })
  Numero: number;
  @Column({ primary: true })
  Cod_Pro: number;
  @Column({ type: "int", nullable: false })
  cantidad: number;
  @ManyToOne(() => Producto, (producto) => producto.detalles)
  @JoinColumn({ name: "Cod_Pro" })
  producto: Producto;
  @ManyToOne(() => CabeceraFactura, (cabecera) => cabecera.detalles)
  @JoinColumn({ name: "Numero" })
  cabecera: CabeceraFactura;
}

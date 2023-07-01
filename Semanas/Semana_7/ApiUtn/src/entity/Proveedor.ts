import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { Persona } from "./Persona";
import { Producto } from "./Producto";

@Entity()
export class Proveedor {
  @PrimaryColumn({ type: "int", nullable: false })
  CodProveedor: number;
  @OneToOne(() => Persona, { cascade: ["insert", "update"] })
  @JoinColumn({ name: "CodProveedor" })
  persona: Persona;
  @Column({ type: "varchar", length: "10", nullable: false })
  Nombre_Proveedor: string;
  @Column({ type: "varchar", length: "10", nullable: false })
  Apellidos_Proveedor: string;
  @Column({ type: "varchar", length: "20", nullable: false })
  Dirección_Proveedor: string;
  @Column({ type: "varchar", length: "10", nullable: false })
  Provincia_Proveedor: Date;
  @Column({ type: "int", nullable: false })
  Telefono_Proveedor: number;
  @OneToMany(() => Producto, (producto) => producto.proveedor)
  producto: Producto[];
}

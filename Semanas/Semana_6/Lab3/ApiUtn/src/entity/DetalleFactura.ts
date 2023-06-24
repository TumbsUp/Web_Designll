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
  @PrimaryColumn({ unique: true, nullable: false })
  Numero: number;
  @PrimaryColumn()
  Cod_Producto: number;
  @ManyToOne(() => Producto, (producto) => producto.detalles, {
    cascade: true,
  })
  @JoinColumn({
    name: "Cod_Producto",
    referencedColumnName: "Cod_Producto",
  })
  producto: Producto;
  @ManyToOne(() => CabeceraFactura, (cabecera) => cabecera.detalles, {
    cascade: true,
  })
  @JoinColumn({ name: "Numero", referencedColumnName: "Numero" })
  cabecera: CabeceraFactura;
  @Column({ type: "int", nullable: false })
  cantidad: number;
}

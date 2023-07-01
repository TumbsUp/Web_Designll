import { IsEmail, IsNotEmpty, MaxLength, maxLength } from "class-validator";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Proveedor } from "./Proveedor";
import { DetalleFactura } from "./DetalleFactura";

@Entity()
export class Producto {
  @Column({ primary: true })
  Cod_Producto: number;
  @Column({ length: 5 })
  @MaxLength(5, { message: "Debe ser menos de 5 caracteres" })
  @IsNotEmpty()
  nombre: string;
  @Column()
  @IsNotEmpty({ message: "ddd" })
  precio: number;
  @Column()
  @IsNotEmpty()
  stock: number;
  @Column()
  fechaIngreso: Date;
  @Column()
  estado: boolean;
  @ManyToOne(() => Proveedor, (proveedor) => proveedor.producto, {
    nullable: false,
  })
  @JoinColumn({ name: "Cod_Prove" })
  proveedor: Proveedor;
  @OneToMany(() => DetalleFactura, (detalle) => detalle.producto)
  detalles: DetalleFactura[];
}

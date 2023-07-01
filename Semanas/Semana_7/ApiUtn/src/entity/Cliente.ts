import { IsNotEmpty, MaxLength } from "class-validator";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { Persona } from "./Persona";
import { TipoCliente } from "./TipoCliente";
import { CabeceraFactura } from "./CabeceraFactura";

@Entity()
export class Cliente {
  @PrimaryColumn({ type: "int", nullable: false })
  cedula: number;
  @OneToOne(() => Persona, { cascade: ["insert", "update"] })
  @JoinColumn({ name: "cedula" })
  persona: Persona;
  @Column({ type: "varchar", length: "12", nullable: false })
  @IsNotEmpty({ message: "" })
  fechaIngreso: Date;
  @Column({ type: "boolean", nullable: false })
  Estado: boolean;

  @ManyToOne(() => TipoCliente, (tipocliente) => tipocliente.clientes)
  @JoinColumn()
  tipoCliente: TipoCliente;
  @OneToMany(() => CabeceraFactura, (cabecera) => cabecera.cliente)
  cabeceras: CabeceraFactura[];
}

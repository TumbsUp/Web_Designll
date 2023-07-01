import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { CabeceraFactura } from "./CabeceraFactura";
import { Persona } from "./Persona";
import { Usuario } from "./Usuario";

@Entity()
export class Vendedor {
  @PrimaryColumn()
  CodVendedor: number;
  @OneToOne(() => Persona, { cascade: ["insert", "update"] })
  @JoinColumn({ name: "CodVendedor" })
  persona: Persona;
  @Column()
  Nombre_Vendedor: string;
  @Column()
  Apellidos_Vendedor: string;
  @Column()
  Dirección_Vendedor: string;
  @Column()
  Telefono_Vendedor: number;
  @Column()
  Celular_vendedor: number;
  @OneToMany(() => Usuario, (usuario) => usuario.vendedor, {
    cascade: ["insert", "update"],
  })
  usuarios: Usuario[];
  @OneToMany(() => CabeceraFactura, (cabecera) => cabecera.vendedor)
  cabeceras: CabeceraFactura[];
}

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
import { Matricula } from "./Matrícula";
import { DetalleMatricula } from "./DetalleMatricula";

@Entity()
export class Estudiante {
  @PrimaryColumn()
  cedula: String;

  @Column()
  beca: boolean;

  @Column()
  fechaIngreso: Date;

  @Column()
  estado: boolean;

  //Relations
  @OneToOne(() => Persona, { cascade: ["insert", "update"] })
  @JoinColumn({ name: "cedula" })
  persona: Persona;

  @OneToMany(() => Matricula, (matricula) => matricula.estudiante)
  matricula: Matricula[];
}

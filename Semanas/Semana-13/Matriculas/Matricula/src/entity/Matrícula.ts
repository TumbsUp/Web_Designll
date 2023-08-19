import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Estudiante } from "./Estudiante";
import { DetalleMatricula } from "./DetalleMatricula";

@Entity()
export class Matricula {
  @PrimaryGeneratedColumn()
  idMatricula: number;

  @Column()
  Fecha: Date;

  @Column()
  cedula: string;

  @ManyToOne(() => Estudiante, (estudiante) => estudiante.matricula)
  @JoinColumn({ name: "cedula" })
  estudiante: Estudiante;

  @OneToMany(() => DetalleMatricula, (detalle) => detalle.matricula, {
    cascade: ["insert", "update"],
  })
  detalle: DetalleMatricula[];

  @Column({ default: true })
  estado: boolean;
}

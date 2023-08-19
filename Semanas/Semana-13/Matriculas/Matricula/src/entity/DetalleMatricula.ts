import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Matricula } from "./Matrícula";
import { Cursos } from "./Cursos";
import { Estudiante } from "./Estudiante";

@Entity()
export class DetalleMatricula {
  @Column({ primary: true })
  idMatricula: number;

  @Column({ primary: true })
  idCurso: number;

  @Column()
  cant: number;

  @ManyToOne(() => Matricula, (matricula) => matricula.detalle)
  @JoinColumn({ name: "idMatricula" })
  matricula: Matricula;

  @ManyToOne(() => Cursos, (cursos) => cursos.detalles)
  @JoinColumn({ name: "idCurso" })
  cursos: Cursos;
}

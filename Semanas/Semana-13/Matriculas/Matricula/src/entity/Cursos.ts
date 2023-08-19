import { IsEmail, IsNotEmpty, MaxLength, maxLength } from "class-validator";
import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DetalleMatricula } from "./DetalleMatricula";

@Entity()
export class Cursos {
  @PrimaryColumn()
  id: number;

  @Column({ length: 200 })
  @MaxLength(200, { message: "Debe ser menos de 200 caracteres" })
  @IsNotEmpty()
  nombre: string;

  @Column()
  fechaIngreso: Date;

  @Column()
  estado: boolean;

  @OneToMany(() => DetalleMatricula, (detalle) => detalle.cursos)
  detalles: DetalleMatricula[];
}

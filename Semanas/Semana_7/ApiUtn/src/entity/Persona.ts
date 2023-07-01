import { IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Cliente } from "./Cliente";

@Entity()
export class Persona {
  @PrimaryColumn({ type: "int", nullable: false })
  Cedula: number;
  @Column({ type: "varchar", length: "12", nullable: false })
  @MaxLength(50)
  @IsNotEmpty({})
  Nombre: string;
  @Column({ type: "varchar", length: "12", nullable: false })
  @IsNotEmpty({ message: "" })
  Apellido1: string;
  @Column({ type: "varchar", length: "12", nullable: false })
  @IsNotEmpty()
  Apellido2: string;
  @Column({ type: "date", nullable: false })
  FechaNacimiento: Date;
  @Column({ type: "char", length: "1", nullable: false })
  Genero: string;
}

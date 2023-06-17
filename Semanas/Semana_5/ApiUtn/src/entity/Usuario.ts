import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Usuario {
  @PrimaryColumn()
  @IsNotEmpty()
  idUsuario: number;
  @Column()
  @IsNotEmpty()
  nombreUsuario: string;
  @Column()
  @IsNotEmpty()
  contraseña: string;
  @Column()
  @IsNotEmpty()
  estado: boolean;
}

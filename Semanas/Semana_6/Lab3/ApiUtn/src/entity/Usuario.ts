import { IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity()
export class Usuario {
  @PrimaryColumn()
  @IsNotEmpty()
  idUsuario: number;
  @Column()
  @IsNotEmpty({ message: "No se colocó nombre de usuario" })
  nombreUsuario: string;
  @Column()
  @IsNotEmpty({ message: "Debe de ingresar un correo electronico  " })
  email: string;
  @Column()
  @IsNotEmpty({ message: "Contraseña no puede estar vacía" })
  password: string;
  @Column()
  @IsNotEmpty({ message: "Debe de asignar un rol" })
  rol: string;
  @Column()
  @IsNotEmpty()
  estado: boolean;

  hashPassword(): void {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  checkPassword(pass: string): boolean {
    return bcrypt.compareSync(pass, this.password);
  }
}

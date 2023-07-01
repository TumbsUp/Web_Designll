import { IsNotEmpty } from "class-validator";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import * as bcrypt from "bcryptjs";
import { Rol } from "./Rol";
import { Vendedor } from "./Vendedor";

@Entity()
export class Usuario {
  @Column({ primary: true })
  @IsNotEmpty()
  idUsuario: number;
  @ManyToOne(() => Vendedor, (vendedor) => vendedor.usuarios)
  @JoinColumn({ name: "idUsuario" })
  vendedor: Vendedor;
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
  idRol: string;
  @OneToOne(() => Rol, { cascade: ["insert", "update"] })
  @JoinColumn({ name: "idRol" })
  rol: Rol;
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

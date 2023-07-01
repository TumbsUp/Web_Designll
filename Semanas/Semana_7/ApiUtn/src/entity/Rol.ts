import { Column, Entity, PrimaryColumn } from "typeorm";
import routes from "../routes";

@Entity()
export class Rol {
  @PrimaryColumn()
  idRol: number;
  @Column()
  rol: string;
}
export default routes;

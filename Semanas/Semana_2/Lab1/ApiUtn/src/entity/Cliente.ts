import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Cliente{

    @PrimaryColumn()
    Cedula:number;
    @Column()
    Nombre: string;
    @Column()
    Apellido1: string;
    @Column()
    Apellido2: string;
    @Column()
    FechaNacimiento: Date;
    @Column()
    Genero: string;
    @Column()
    Estado: boolean;
}
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Proveedor{
    @PrimaryColumn({type: "int", nullable: false})
    CodProveedor:number;
    @Column({type: "varchar", length: "10", nullable: false})
    Nombre_Proveedor: string;
    @Column({type: "varchar", length: "10", nullable: false})
    Apellidos_Proveedor: string;
    @Column({type: "varchar", length: "20", nullable: false})
    Dirección_Proveedor: string;
    @Column({type: "varchar", length: "10", nullable: false})
    Provincia_Proveedor: Date;
    @Column({type: "int", nullable: false})
    Telefono_Proveedor: number;
}
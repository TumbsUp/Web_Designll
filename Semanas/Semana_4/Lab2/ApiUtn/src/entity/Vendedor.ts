import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Vendedor{
    @PrimaryColumn()
    CodVendedor:number;
    @Column()
    Nombre_Vendedor: string;
    @Column()
    Apellidos_Vendedor: string;
    @Column()
    Dirección_Vendedor: string;
    @Column()
    Telefono_Vendedor: number;
    @Column()
    Celular_vendedor: number;
}
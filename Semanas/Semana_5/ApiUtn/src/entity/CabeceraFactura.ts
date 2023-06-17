import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Cliente } from "./Cliente";
import { Vendedor } from "./Vendedor";

@Entity()
export class CabeceraFactura{
    @PrimaryColumn({type: "int", nullable: false})
    Numero: number;
    @Column({type: "date", nullable: false})
    fecha: Date;
    @OneToOne((type)=> Cliente, {
        eager: true,
        cascade: true
        , nullable: false
    }) 
    @JoinColumn({name: 'Cedula_Cliente'})
    cliente:Cliente;
    @OneToOne((type)=> Vendedor, {
        eager: true,
        cascade: true,
        nullable: false
    }) 
    @JoinColumn({name: 'Codigo_Vendedor'})
    vendedor:Vendedor;
}
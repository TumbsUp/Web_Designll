import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { CabeceraFactura } from "./CabeceraFactura";
import { Producto } from "./Producto";

@Entity()
export class DetalleFactura{
    @PrimaryColumn({type: "int",nullable: false})
    id:number;
    @OneToOne((type)=> CabeceraFactura, {
        eager: true,
        cascade: true, 
        nullable: false
    }) 
    @JoinColumn({name: 'Numero'})
    Cabecera_Factura:CabeceraFactura;
    @Column({type: "int", nullable: false})
    cantidad: number;
    @ManyToMany(type=> Producto, producto=> producto.detallesFactura)
    @JoinColumn({name: 'Codigo_Producto'})
    productos: Producto[];
}
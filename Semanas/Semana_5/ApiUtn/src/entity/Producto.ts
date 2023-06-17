import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { Proveedor } from "./Proveedor";
import { DetalleFactura } from "./DetalleFactura";

@Entity()
export class Producto{
    
    @PrimaryColumn({type: "int",nullable: false})
    Cod_Producto: number;
    @Column({type: "varchar", length: "6", nullable: false})
    Descripcion_Producto: string;
    @Column({type: "int", nullable: false})
    Precio_Producto: number;
    @Column({type: "int", nullable: false})
    MaxStock: number;
    @Column({type: "int", nullable: false})
    MinStock: number;
    @OneToOne(type => Proveedor, {
        eager : true,
        cascade: true, 
        nullable: false
    })
    @JoinColumn({name: 'Codigo_Proveedor'})
    proveedor: Proveedor;
    @ManyToMany(type => DetalleFactura, detalleFactura => detalleFactura.productos)
    @JoinColumn({name:'Cod_Producto'})
    detallesFactura : DetalleFactura[];
}
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Persona } from './Persona';
import { TipoCliente } from './TipoCliente';
import { Factura } from './Factura';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Cliente {
  @PrimaryColumn()
  cedula: String;

  @ManyToOne(() => TipoCliente, (tipoCliente) => tipoCliente.clientes)
  tipoCliente: TipoCliente;

  @Column()
  fechaIngreso: Date;

  @Column()
  @IsNotEmpty()
  estado: Boolean;

  @OneToOne(() => Persona, { cascade: ['insert', 'update'] })
  @JoinColumn({ name: 'cedula' })
  persona: Persona;

  @OneToMany(() => Factura, (factura) => factura.cliente)
  facturas: Factura[];
}

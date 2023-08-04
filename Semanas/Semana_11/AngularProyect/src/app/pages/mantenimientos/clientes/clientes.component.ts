import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AdminClientesComponent } from './admin-clientes/admin-clientes.component';
import Clientes from 'src/app/shared/models/cliente';
import clienteResponse from 'src/app/shared/models/clienteResponse';
import { ClientesService } from 'src/app/shared/services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent {
  displayedColumns: string[] = ['cedula', 'Nombre', 'TipoCliente', 'acciones'];

  results: clienteResponse;
  dataSource = new MatTableDataSource();

  constructor(private srvClientes: ClientesService, public dialog: MatDialog) {}
  ngOnInit() {
    this.srvClientes.getAll().subscribe((results) => {
      this.dataSource.data = results;
      console.log(results);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  modificar(): void {
    alert('modificar');
  }

  eliminar(cedula: string): void {
    this.srvClientes.eliminar(cedula).subscribe(
      (dato) => {
        alert('Se eliminó el producto');
      },
      (err) => {
        alert('Error al eliminar');
      }
    );
  }

  detalle(dato: Clientes): void {
    alert(dato.cedula);
  }

  abrirDialog(producto?: Clientes): void {
    if (producto) {
      this.dialog.open(AdminClientesComponent, {
        width: '700px',
        height: '700px',
        data: { producto },
      });
    } else {
      this.dialog.open(AdminClientesComponent, {
        width: '700px',
        height: '700px',
      });
    }
  }
}

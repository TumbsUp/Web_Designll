import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Usuario from 'src/app/shared/models/usuario';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent {
  displayedColumns: string[] = ['cedula', 'nombre', 'correo', 'acciones'];

  dataSource = new MatTableDataSource();

  constructor(private srvUsuario: UsuariosService, public dialog: MatDialog) {}
  ngOnInit() {
    this.srvUsuario.getAll().subscribe((datos) => {
      this.dataSource.data = datos;
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
    this.srvUsuario.eliminar(cedula).subscribe(
      (dato) => {
        alert('Se eliminó el producto');
      },
      (err) => {
        alert('Error al eliminar');
      }
    );
  }

  detalle(dato: Usuario): void {
    alert(dato.nombre);
  }

  abrirDialog(usuario?: Usuario): void {
    if (usuario) {
      this.dialog.open(AdminUsuariosComponent, {
        width: '700px',
        height: '700px',
        data: { usuario },
      });
    } else {
      this.dialog.open(AdminUsuariosComponent, {
        width: '700px',
        height: '700px',
      });
    }
  }
}

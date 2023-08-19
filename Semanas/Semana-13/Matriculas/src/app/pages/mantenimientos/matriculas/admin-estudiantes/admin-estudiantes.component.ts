import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { EstudianteService } from 'src/app/shared/services/estudiantes.service';

@Component({
  selector: 'app-admin-estudiantes',
  templateUrl: './admin-estudiantes.component.html',
  styleUrls: ['./admin-estudiantes.component.scss'],
})
export class AdminEstudiantesComponent {
  displayedColumns: string[] = [
    'id',
    'nombre',
    'categoria',
    'precio',
    'acciones',
  ];

  dataSource = new MatTableDataSource();

  constructor(
    private srvEstudiantes: EstudianteService,
    public dialog: MatDialog,
    private mensajeria: ToastrService
  ) {}
  ngOnInit() {
    this.cargarLista();
  }

  cargarLista() {
    this.srvEstudiantes.getAll().subscribe(
      (datos) => {
        // console.log(datos);
        this.dataSource.data = datos;
      },
      (error) => {
        this.mensajeria.error(error);
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

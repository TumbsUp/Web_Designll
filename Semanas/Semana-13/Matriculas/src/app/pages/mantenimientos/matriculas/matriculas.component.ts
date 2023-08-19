import { Component } from '@angular/core';
import { AdminEstudiantesComponent } from './admin-estudiantes/admin-estudiantes.component';
import { AdminCursosComponent } from './admin-cursos/admin-cursos.component';
import { Cursos } from 'Matricula/src/entity/Cursos';
import { Estudiantes } from 'src/app/shared/models/estudiante';
import { CursosService } from 'src/app/shared/services/cursos.service';
import { EstudianteService } from 'src/app/shared/services/estudiantes.service';
import { MatriculaService } from 'src/app/shared/services/matricula.service';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/materialmodule';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-matriculas',
  templateUrl: './matriculas.component.html',
  styleUrls: ['./matriculas.component.scss'],
})
export class MatriculasComponent {
  constructor(
    private srvCursos: CursosService,
    private srvEstudiantes: EstudianteService,
    private srvMatriculas: MatriculaService,
    public dialog: MatDialog,
    private mensajeria: ToastrService
  ) {}

  abrirCursos(any?: Estudiantes): void {
    let openDialog;
    openDialog = this.dialog.open(AdminCursosComponent, {
      width: '700px',
      height: '700px',
    });
  }

  abrirEstudiante(any?: Cursos): void {
    let openDialog;
    openDialog = this.dialog.open(AdminEstudiantesComponent, {
      width: '700px',
      height: '700px',
    });
  }
}

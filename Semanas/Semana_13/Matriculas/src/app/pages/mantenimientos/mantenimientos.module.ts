import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MantenimientosRoutingModule } from './mantenimientos-routing.module';
import { MantenimientosComponent } from './mantenimientos.component';
import { MatriculasComponent } from './matriculas/matriculas.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { CursosComponent } from './cursos/cursos.component';
import { AdminEstudiantesComponent } from './estudiantes/admin-estudiantes/admin-estudiantes.component';
import { AdminCursosComponent } from './cursos/admin-cursos/admin-cursos.component';

@NgModule({
  declarations: [
    MantenimientosComponent,
    MatriculasComponent,
    EstudiantesComponent,
    CursosComponent,
    AdminEstudiantesComponent,
    AdminCursosComponent,
  ],
  imports: [CommonModule, MantenimientosRoutingModule],
})
export class MantenimientosModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantenimientosComponent } from './mantenimientos.component';
import { MatriculasComponent } from './matriculas/matriculas.component';

const routes: Routes = [
  { path: '', component: MantenimientosComponent },
  { path: 'matricula', component: MatriculasComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MantenimientosRoutingModule {}

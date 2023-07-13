import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/seguridades/login/login.component';

const routes: Routes = [
  // {
  //   path: 'seguridades',
  //   loadChildren: () =>
  //     import('./pages/seguridades/seguridades.module').then(
  //       (m) => m.SeguridadesModule
  //     ),
  // },
  {
    path: '',
    redirectTo: 'seguridades/Login',
    pathMatch: 'full',
  },
  {
    path: 'seguridades/Login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

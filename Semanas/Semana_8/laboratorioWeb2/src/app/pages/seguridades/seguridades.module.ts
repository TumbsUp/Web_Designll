import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadesRoutingModule } from './seguridades-routing.module';
import { SeguridadesComponent } from './seguridades.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    SeguridadesComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    SeguridadesRoutingModule
  ]
})
export class SeguridadesModule { }

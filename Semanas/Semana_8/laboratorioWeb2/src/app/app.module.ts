import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './shared/components/header/header.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SeguridadesModule } from './pages/seguridades/seguridades.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, MenuComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SeguridadesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

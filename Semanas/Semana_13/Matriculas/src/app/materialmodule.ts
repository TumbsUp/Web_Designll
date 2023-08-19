import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

const lista = [
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatInputModule,
  MatFormFieldModule,
  MatDialogModule,
  MatSelectModule,
  MatIconModule,
  MatToolbarModule,
];

@NgModule({
  exports: [...lista],
  imports: [...lista],
})
export class MaterialModule {}

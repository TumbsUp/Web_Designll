import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class PersonasForm {
  baseForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.baseForm = this.fb.group({
      cedula: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      apellido1: ['', [Validators.required]],
      apellido2: ['', [Validators.required]],
      fechaNac: [Date, Validators.required],
    });
  }
}

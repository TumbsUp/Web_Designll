import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ClientesForm {
  baseForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.baseForm = this.fb.group({
      cedula: ['', [Validators.required]],
      fechaIngreso: [Date.now, [Validators.required, Validators.minLength(5)]],
      tipoClienteId: [0, [Validators.required]],
      estado: [true],
    });
  }
}

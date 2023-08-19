import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Injectable({ providedIn: 'root' })
export class cursoForm {
  baseForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.baseForm = this.fb.group({
      id: [0, [Validators.required]],
      nombre: ['', [Validators.required]],
      fechaIngreso: [
        formatDate(Date.now(), 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      estado: [true],
    });
  }
}

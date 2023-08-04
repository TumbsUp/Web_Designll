import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientesForm } from 'src/app/shared/formsModels/clientesForms';
import { PersonasForm } from 'src/app/shared/formsModels/personasForms';
import { ClientesService } from 'src/app/shared/services/clientes.service';

@Component({
  selector: 'app-admin-clientes',
  templateUrl: './admin-clientes.component.html',
  styleUrls: ['./admin-clientes.component.scss'],
})
export class AdminClientesComponent {
  titulo = 'Nuevo Cliente';
  isCreate = true;
  constructor(
    public clienteForm: ClientesForm,
    public personaForm: PersonasForm,
    private srvClientes: ClientesService,
    @Inject(MAT_DIALOG_DATA) public data: { producto: any }
  ) {}
  ngOnInit() {
    if (this.data?.producto) {
      this.isCreate = false;
      this.titulo = 'Modificar Cliente';
      this.cargarDatosForm();
    } else {
      this.isCreate = true;
      this.titulo = 'Crear Cliente';
    }
  }
  cargarDatosForm() {
    this.clienteForm.baseForm.patchValue({
      id: this.data.producto.id,
      nombre: this.data.producto.nombre,
      precio: this.data.producto.precio,
      stock: this.data.producto.stock,
      fechaIngreso: this.data.producto.fechaIngreso,
      estado: true,
    });
  }

  guardar() {
    if (this.clienteForm.baseForm.valid) {
      if (this.isCreate) {
        this.srvClientes.guardar(this.clienteForm.baseForm.value).subscribe(
          (dato) => {
            this.clienteForm.baseForm.reset();
            alert('SE GUARDO CORRECTAMENTE');
          },
          (error) => {
            alert('Error al guardar');
          }
        );
      } else {
        this.srvClientes.modificar(this.clienteForm.baseForm.value).subscribe(
          (dato) => {
            this.clienteForm.baseForm.reset();
            alert('SE MODIFICO CORRECTAMENTE');
          },
          (error) => {
            alert('Error al guardar');
          }
        );
      }
    }
  }
}

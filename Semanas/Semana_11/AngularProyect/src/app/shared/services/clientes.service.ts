import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Clientes from '../models/cliente';
import clientesResponse from '../models/clienteResponse';
@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<clientesResponse[]> {
    return this.http.get<clientesResponse[]>(
      'http://localhost:3000/clientes/getAll'
    );
  }
  guardar(cliente: Clientes): Observable<clientesResponse[]> {
    return this.http
      .post<clientesResponse[]>('http://localhost:3000/clientes/add', cliente)
      .pipe(catchError(this.handlerError));
  }
  modificar(cliente: Clientes): Observable<clientesResponse[]> {
    return this.http
      .patch<clientesResponse[]>(
        'http://localhost:3000/clientes/update',
        cliente
      )
      .pipe(catchError(this.handlerError));
  }

  eliminar(cedula: string): Observable<clientesResponse[]> {
    return this.http
      .delete<clientesResponse[]>('http://localhost:3000/clientes/' + cedula)
      .pipe(catchError(this.handlerError));
  }

  handlerError(error: any): Observable<never> {
    console.log(error);
    return throwError(error);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Usuario from '../models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>('http://localhost:3000/usuarios/getAll');
  }
  guardar(usuario: Usuario): Observable<Usuario> {
    return this.http
      .post<Usuario>('http://localhost:3000/usuarios/add ', usuario)
      .pipe(catchError(this.handlerError));
  }
  modificar(usuario: Usuario): Observable<Usuario> {
    return this.http
      .patch<Usuario>('http://localhost:3000/usuarios/update', usuario)
      .pipe(catchError(this.handlerError));
  }

  eliminar(cedula: string): Observable<Usuario> {
    return this.http
      .delete<Usuario>('http://localhost:3000/usuarios/' + cedula)
      .pipe(catchError(this.handlerError));
  }

  handlerError(error: any): Observable<never> {
    console.log(error);
    return throwError(error);
  }
}

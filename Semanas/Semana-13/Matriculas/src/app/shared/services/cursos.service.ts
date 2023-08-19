import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Cursos } from '../models/curso';
@Injectable({
  providedIn: 'root',
})
export class CursosService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Cursos[]> {
    return this.http
      .get<Cursos[]>('http://localhost:3000/Cursos/getCursos')
      .pipe(catchError(this.handlerError));
  }
  handlerError(error: HttpErrorResponse) {
    let mensaje = 'Error desconocido, reporte al administrador';
    if (error?.error) {
      mensaje = error?.error?.mensaje;
    }
    return throwError(() => new Error(mensaje));
  }
}

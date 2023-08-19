import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Estudiantes } from '../models/estudiante';

@Injectable({
  providedIn: 'root',
})
export class EstudianteService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Estudiantes[]> {
    return this.http
      .get<Estudiantes[]>('http://localhost:3000/Estudiantes/getEstudiantes')
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

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Estudiantes } from '../models/estudiante';
import matriculasResponse from '../models/matriculaResponse';

@Injectable({
  providedIn: 'root',
})
export class MatriculaService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<matriculasResponse> {
    return this.http
      .get<matriculasResponse>('http://localhost:3000/Matriculas/GetMatriculas')
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

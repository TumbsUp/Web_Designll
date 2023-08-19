import { detalles } from './detalles';
import { Estudiantes } from './estudiante';
import { Matriculas } from './matricula';

export default interface matriculasResponse {
  matricula: Matriculas;
  estudiantes: Estudiantes[];
  detalles: detalles[];
}

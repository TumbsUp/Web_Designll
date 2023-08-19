import "reflect-metadata";
import { DataSource } from "typeorm";
import { Persona } from "./entity/Persona";
import { Estudiante } from "./entity/Estudiante";
import { Cursos } from "./entity/Cursos";
import { DetalleMatricula } from "./entity/DetalleMatricula";
import { Matricula } from "./entity/Matrícula";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "8908",
  database: "matricula_estudiantes",
  synchronize: true,
  logging: false,
  entities: [Estudiante, Cursos, Persona, DetalleMatricula, Matricula],
  migrations: [],
  subscribers: [],
});

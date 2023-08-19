import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Matricula } from "../entity/Matrícula";
import { DetalleMatricula } from "../entity/DetalleMatricula";
import { validate } from "class-validator";
import { Cursos } from "../entity/Cursos";
import { Estudiante } from "../entity/Estudiante";

class MatriculaController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const MatriculaRepo = AppDataSource.getRepository(Matricula);

      let lista;
      try {
        lista = await MatriculaRepo.find({
          where: { estado: true },
          relations: {
            detalle: true,
            estudiante: true,
          },
        });
      } catch (error) {
        return resp.status(404).json({ mensaje: "No se encontraron datos" });
      }
      if (lista.lengh !== 0) {
        return resp.status(200).json(lista);
      }
    } catch (error) {
      return resp.status(400).json({ mensaje: "Error al cargar" });
    }
  };
  static add = async (req: Request, resp: Response) => {
    try {
      const MatricualRepo = AppDataSource.getRepository(Matricula);
      const cursosRepo = AppDataSource.getRepository(Cursos);
      const estudianteRepo = AppDataSource.getRepository(Estudiante);
      //   const detallesRepo = AppDataSource.getRepository(DetalleMatricula);
      //DESTRUCTURING
      const { idMatricula, estudiante, detalle } = req.body;
      let curso: Cursos;
      let estud: Estudiante;
      const mat = await MatricualRepo.findOne({ where: { idMatricula } });
      if (mat) {
        return resp.status(404).json({ mensaje: "Matricula Repetida" });
      }

      try {
        estud = await estudianteRepo.findOneOrFail({
          where: { cedula: estudiante },
        });
      } catch (error) {
        return resp.status(404).json({ mensaje: "Estudiante Inexistente" });
      }

      try {
        for (var i = 0; i < detalle.length; i++) {
          curso = await cursosRepo.findOneOrFail({
            where: { detalles: { idCurso: detalle } },
          });
        }
      } catch (error) {
        return resp.status(404).json({ mensaje: "Curso Inexistente " + i });
      }

      let matricula = new Matricula();
      const date = new Date();
      matricula.idMatricula = idMatricula;
      matricula.Fecha = date;
      matricula.estudiante = estud;
      matricula.detalle = detalle;
      matricula.estudiante = estud;
      matricula.estado = true;

      //VALIDAR CON CLASS VALIDATOR
      const errors = await validate(matricula, {
        validationError: { target: false, value: false },
      });
      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      // cliente.FechaNacimiento=Date.now()
      await MatricualRepo.save(matricula);
      return resp.status(201).json({ mensaje: "Matricula Hecha" });
    } catch (error) {
      return resp.status(404).json({ mensaje: error });
    }
  };
  static update = async (req: Request, resp: Response) => {};
  static delete = async (req: Request, resp: Response) => {};
}

export default MatriculaController;

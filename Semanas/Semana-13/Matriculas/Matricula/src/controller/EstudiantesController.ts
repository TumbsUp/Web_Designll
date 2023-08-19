import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Estudiante } from "../entity/Estudiante";

export class EstudiantesController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const EstudiantesRepo = AppDataSource.getRepository(Estudiante);

      let lista;
      try {
        lista = await EstudiantesRepo.find({
          where: { estado: true },
          relations: { persona: true },
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
  static add = async (req: Request, resp: Response) => {};
}

export default EstudiantesController;

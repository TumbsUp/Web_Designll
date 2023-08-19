import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Cursos } from "../entity/Cursos";

export class CursosController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const CursosRepo = AppDataSource.getRepository(Cursos);

      let lista;
      try {
        lista = await CursosRepo.find({
          where: { estado: true },
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

export default CursosController;

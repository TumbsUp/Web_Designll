import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { DetalleFactura } from "../entity/DetalleFactura";
import { CabeceraFactura } from "../entity/CabeceraFactura";

class FacturaController {
  static getFactura = async (req: Request, resp: Response) => {
    try {
      const DetFacRepo = AppDataSource.getRepository(DetalleFactura);
      const CabeRepo = AppDataSource.getRepository(CabeceraFactura);

      const ListaDetFacRepo = await DetFacRepo.find();
      const ListaCabeRepo = await CabeRepo.find();

      if (ListaCabeRepo.length == 0 && ListaDetFacRepo.length == 0) {
        return resp.status(404).json({ mensaje: "No existe ninguna factura" });
      }
      return resp.status(200).json([ListaCabeRepo, ListaDetFacRepo]);
    } catch (error) {
      return resp.status(400).json({ mensaje: error.error });
    }
  };
}
export default FacturaController;

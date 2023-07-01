import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { DetalleFactura } from "../entity/DetalleFactura";
import { CabeceraFactura } from "../entity/CabeceraFactura";
import { validate } from "class-validator";

class FacturaController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const CabeRepo = AppDataSource.getRepository(CabeceraFactura);

      let lista;
      try {
        lista = await CabeRepo.find({
          where: { estado: true },
          relations: {
            detalles: true,
            vendedor: true,
            cliente: { persona: true },
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
  static getById = async (req: Request, resp: Response) => {
    try {
      const Numero = parseInt(req.params["Numero"]);
      if (!Numero) {
        return resp.status(404).json({ mensaje: "No se Indica el ID" });
      }
      const CabeRepo = AppDataSource.getRepository(CabeceraFactura);

      let lista;
      try {
        lista = await CabeRepo.findOneOrFail({
          where: { estado: true, Numero: Numero },
          relations: {
            detalles: true,
            vendedor: true,
            cliente: { persona: true },
          },
        });
      } catch (error) {
        return resp
          .status(404)
          .json({ mensaje: "No se encontró dicha factura" });
      }
      return resp.status(200).json(lista);
    } catch (error) {
      return resp.status(400).json({ mensaje: "Error al cargar" });
    }
  };
  static add = async (req: Request, resp: Response) => {
    try {
      const facturaRepo = AppDataSource.getRepository(CabeceraFactura);
      let detalle: DetalleFactura[] = [];
      //DESTRUCTURING
      const {
        Numero,
        estado,
        cliente: { Cedula_Cliente },
        detalles: [Cod_Producto, cantidad],
      } = req.body;

      let details = new DetalleFactura();
      details.Cod_Pro = Cod_Producto;
      details.cantidad = cantidad;
      detalle.push(details);
      const date = new Date();
      let factura = new CabeceraFactura();
      factura.Numero = Numero;
      factura.fecha = date;
      factura.estado = estado;
      factura.cliente = Cedula_Cliente;
      factura.detalles = detalle;
      //VALIDAR CON CLASS VALIDATOR
      const errors = await validate(factura, {
        validationError: { target: false, value: false },
      });
      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      // cliente.FechaNacimiento=Date.now()
      await facturaRepo.save(factura);
      return resp.status(201).json({ mensaje: "Factura Creada" });
    } catch (error) {
      return resp.status(404).json({ mensaje: error });
    }
  };
  static update = async (req: Request, resp: Response) => {
    try {
      const Numero = parseInt(req.params["Numero"]);
      if (!Numero) {
        return resp.status(404).json({ mensaje: "No se Indica el ID" });
      }
      const detalles = AppDataSource.getRepository(CabeceraFactura);
      let detalle;
      try {
        detalle = await detalles.findOneOrFail({
          where: { Numero: Numero },
          relations: {
            detalles: true,
          },
        });
        //DESTRUCTURING
        const {
          detalle: [Cod_Producto, cantidad],
        } = req.body;
        const productoToUpdate = await detalle.findOneBy({
          Cod_Pro: Cod_Producto,
        });
        productoToUpdate.Cod_Pro = Cod_Producto;
        productoToUpdate.cantidad = cantidad;
        await detalles.save(productoToUpdate);
        return resp.status(200).json({ mensaje: "Factura Actualizada" });
      } catch (error) {
        return resp.status(404).json({
          mensaje: "No se encontró factura con ese ID",
        });
      }
    } catch (error) {
      return resp.status(404).json({ mensaje: error });
    }
  };
  static delete = async (req: Request, resp: Response) => {
    try {
      const Numero = parseInt(req.params["id"]);
      if (!Numero) {
        return resp.status(404).json({ mensaje: "No se Indica el ID" });
      }
      const Facturas = AppDataSource.getRepository(CabeceraFactura);
      let Factura: CabeceraFactura;
      try {
        Factura = await Facturas.findOneOrFail({
          where: { Numero, estado: true },
        });
      } catch (error) {
        return resp.status(404).json({
          mensaje: "No se encontró factura con ese ID",
        });
      }
      Factura.estado = false;
      try {
        await Facturas.save(Factura);
        return resp.status(200).json({ mensaje: "Factura Eliminada!" });
      } catch (error) {
        return resp.status(400).json({ mensaje: "No se pudo Eliminar..." });
      }
    } catch (error) {
      return resp.status(404).json({ mensaje: error });
    }
  };
}
export default FacturaController;

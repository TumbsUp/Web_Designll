import { Request, Response, response } from "express";
import { AppDataSource } from "../data-source";
import { Cliente } from "../entity/Cliente";
import { validate } from "class-validator";

class Productos_Controller {
  static getAll = async (Request: Request, Response: Response) => {
    try {
      const clientesRepo = AppDataSource.getRepository(Cliente);
      const listClientes = await clientesRepo.find({ where: { Estado: true } });

      if (listClientes.length == 0) {
        return Response.status(404).json({
          mensaje: "No se encontró resultado",
        });
      }

      return Response.status(200).json(listClientes);
    } catch (error) {
      return Response.status(400).json({ mensaje: error });
    }
  };
  static getById = async (Request: Request, Response: Response) => {
    try {
      const cedula = parseInt(Request.params["id"]);

      if (!cedula) {
        return Response.status(404).json({ mensaje: "No se Indica el ID" });
      }

      const clientesRepo = AppDataSource.getRepository(Cliente);
      let cliente;
      try {
        cliente = await clientesRepo.findOneOrFail({
          where: { cedula: cedula },
        });
        return Response.status(200).json({ cliente });
      } catch (error) {
        return Response.status(404).json({
          mensaje: "No se encontró al cliente con ese ID",
        });
      }
    } catch (error) {
      return Response.status(400).json({ mensaje: error });
    }
  };
  static add = async (Request: Request, Response: Response) => {
    try {
      //DESTRUCTURING
      const { cedula, fechaIngreso, estado } = Request.body;

      //const fecha = new Date()l;
      let cliente = new Cliente();
      cliente.cedula = cedula;
      cliente.fechaIngreso = fechaIngreso;
      cliente.Estado = true;
      //VALIDAR CON CLASS VALIDATOR
      const errors = await validate(cliente, {
        validationError: { target: false, value: false },
      });
      if (errors.length > 0) {
        return Response.status(400).json(errors);
      }

      //Validación de Reglas de negocio
      const clientesRepo = AppDataSource.getRepository(Cliente);
      const clien = await clientesRepo.findOne({ where: { cedula: cedula } }); //El error estaba en "where: {Cedula}", se escribe: "Where:{Cedula:Cedula}"

      if (clien) {
        return Response.status(404).json({ mensaje: "Cliente Existente" });
      }

      // cliente.FechaNacimiento=Date.now()
      await clientesRepo.save(cliente);
      return Response.status(201).json({ mensaje: "Cliente Creado" });
    } catch (error) {
      return Response.status(404).json({ mensaje: error });
    }
  };
  static update = async (Request: Request, Response: Response) => {
    try {
      const cedula = parseInt(Request.params["id"]);
      if (!cedula) {
        return Response.status(404).json({ mensaje: "No se Indica el ID" });
      }
      const clientesRepo = AppDataSource.getRepository(Cliente);
      let cliente;
      try {
        cliente = await clientesRepo.findOneOrFail({ where: { cedula } });
        //DESTRUCTURING
        const clientToUpdate = await clientesRepo.findOneBy({ cedula });
        const { fechaIngreso, estado } = Request.body;
        clientToUpdate.fechaIngreso = fechaIngreso;
        clientToUpdate.Estado = estado;
        await clientesRepo.save(clientToUpdate);
        return Response.status(200).json({ mensaje: "Cliente Actualizado!" });
      } catch (error) {
        return Response.status(404).json({
          mensaje: "No se encontró el cliente con ese ID",
        });
      }
    } catch (error) {
      return Response.status(404).json({ mensaje: error });
    }
  };
  static delete = async (Request: Request, Response: Response) => {
    try {
      const cedula = parseInt(Request.params["id"]);
      if (!cedula) {
        return Response.status(404).json({ mensaje: "No se Indica el ID" });
      }
      const clientesRepo = AppDataSource.getRepository(Cliente);
      let cliente: Cliente;
      try {
        cliente = await clientesRepo.findOneOrFail({
          where: { cedula, Estado: true },
        });
      } catch (error) {
        return Response.status(404).json({
          mensaje: "No se encontró el cliente con ese ID",
        });
      }
      cliente.Estado = false;
      try {
        await clientesRepo.save(cliente);
        return Response.status(200).json({ mensaje: "Cliente Eliminado!" });
      } catch (error) {
        return Response.status(400).json({ mensaje: "No se pudo Eliminar..." });
      }
    } catch (error) {
      return Response.status(404).json({ mensaje: error });
    }
  };
}

export default Productos_Controller;

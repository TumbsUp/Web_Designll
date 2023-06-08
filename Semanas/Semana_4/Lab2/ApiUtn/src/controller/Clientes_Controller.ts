import { Request, Response, response } from "express";
import { AppDataSource } from "../data-source";
import { Cliente } from "../entity/Cliente";

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

      return Response.status(200).json({ mensaje: listClientes });
    } catch (error) {
      return Response.status(400).json({ mensaje: error });
    }
  };
  static getById = async (Request: Request, Response: Response) => {
    try {
      const Cedula = parseInt(Request.params["id"]);

      if (!Cedula) {
        return Response.status(404).json({ mensaje: "No se Indica el ID" });
      }

      const clientesRepo = AppDataSource.getRepository(Cliente);
      let cliente;
      try {
        cliente = await clientesRepo.findOneOrFail({ where: { Cedula } });
        return Response.status(200).json({ cliente });
      } catch (error) {
        return Response.status(404).json({mensaje: "No se encontró al cliente con ese ID"})
      }

    } catch (error) {
      return Response.status(400).json({ mensaje: error });
    }
  };
  static add = async (Request: Request, Response: Response) => {
    try {
      //DESTRUCTURING
      const {Cedula,Nombre,Apellido1,Apellido2,FechaNacimiento,Genero} = Request.body

      //Validación de Datos de Entrada
      if(!Cedula){
        return Response.status(404).json({mensaje: "Debe de Indicar el ID"})
      }
      if(!Nombre){
        return Response.status(404).json({mensaje: "Debe de Indicar el nombre"})
      }
      if(!Apellido1){
        return Response.status(404).json({mensaje: "Debe de Indicar el primer apellido"})
      }
      if(!Apellido2){
        return Response.status(404).json({mensaje: "Debe de Indicar el segundo apellido"})
      }
      if(!FechaNacimiento){
        return Response.status(404).json({mensaje: "Debe de Indicar la fecha de nacimiento"})
      }
      if(!Genero){
        return Response.status(404).json({mensaje: "Debe de Indicar el genero"})
      }
      //Validación de Reglas de negocio
      const clientesRepo = AppDataSource.getRepository(Cliente);
      const clien= await clientesRepo.findOne({where: {Cedula:Cedula}})//El error estaba en "where: {Cedula}", se escribe: "Where:{Cedula:Cedula}"

      if(clien){
        return Response.status(404).json({mensaje: "Cliente Existente"})
      }

      // const fecha = Date
      let cliente= new Cliente;
      cliente.Cedula= Cedula;
      cliente.Nombre= Nombre;
      cliente.Apellido1=Apellido1;
      cliente.Apellido2=Apellido2;
      cliente.FechaNacimiento=FechaNacimiento;
      cliente.Genero=Genero;
      cliente.Estado=true;
      // cliente.FechaNacimiento=Date.now()
      await clientesRepo.save(cliente)
      return Response.status(201).json({ mensaje: "Cliente Creado" });
    } catch (error) {
      return Response.status(404).json({mensaje: error})
    }
  };
  static update = async (Request: Request, Response: Response) => {
    try {
      const Cedula = parseInt(Request.params["id"]);
      if (!Cedula) {
        return Response.status(404).json({ mensaje: "No se Indica el ID" });
      }
      const clientesRepo = AppDataSource.getRepository(Cliente);
      let cliente;
      try {
        cliente = await clientesRepo.findOneOrFail({ where: { Cedula } });
        //DESTRUCTURING
        const clientToUpdate = await clientesRepo.findOneBy({Cedula})
        const {Nombre,Genero} = Request.body
      if(!Nombre){
        return Response.status(404).json({mensaje: "Debe de Indicar el nombre"})
      }
      if(!Genero){
        return Response.status(404).json({mensaje: "Debe de Indicar el genero"})
      }
      clientToUpdate.Nombre=Nombre;
      clientToUpdate.Genero=Genero;
      await clientesRepo.save(clientToUpdate)
      return Response.status(200).json({ mensaje: "Cliente Actualizado!" });
      } catch (error) {
        return Response.status(404).json({mensaje: "No se encontró el cliente con ese ID"})
      }
    } catch (error) {
      return Response.status(404).json({mensaje: error})
    }
  };
  static delete = async (Request: Request, Response: Response) => {
    try {
      const Cedula = parseInt(Request.params["id"])
      if(!Cedula){
        return Response.status(404).json({ mensaje: "No se Indica el ID" });
      }
      const clientesRepo = AppDataSource.getRepository(Cliente);
      let cliente;
      try {
        cliente = await clientesRepo.findOneOrFail({ where: { Cedula } });
        const clientToDelete = await clientesRepo.findOneBy({Cedula})    
        await clientesRepo.remove(clientToDelete)
        return Response.status(200).json({ mensaje: "Cliente Eliminado!" });
      } catch (error) {
        return Response.status(404).json({mensaje: "No se encontró el cliente con ese ID"})
      }
    } catch (error) {
      return Response.status(404).json({mensaje: error})
    }
  };
}

export default Productos_Controller;

import { Request, Response, response } from "express";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";
import { validate } from "class-validator";

class Usuario_Controller {
  static getAll = async (Request: Request, Response: Response) => {
    try {
      const usuariosRepo = AppDataSource.getRepository(Usuario);
      const listaUsuarios = await usuariosRepo.find({
        where: { estado: true },
      });

      if (listaUsuarios.length == 0) {
        return Response.status(404).json({
          mensaje: "No se encontró resultado",
        });
      }

      return Response.status(200).json(listaUsuarios);
    } catch (error) {
      return Response.status(400).json({ mensaje: error });
    }
  };
  static getById = async (Request: Request, Response: Response) => {
    try {
      const idUsuario = parseInt(Request.params["id"]);

      if (!idUsuario) {
        return Response.status(404).json({ mensaje: "No se Indica el ID" });
      }

      const usuariosRepo = AppDataSource.getRepository(Usuario);
      let usuario;
      try {
        usuario = await usuariosRepo.findOneOrFail({ where: { idUsuario } });
        return Response.status(200).json({ usuario });
      } catch (error) {
        return Response.status(404).json({
          mensaje: "No se encontró al usuario con ese ID",
        });
      }
    } catch (error) {
      return Response.status(400).json({ mensaje: error });
    }
  };
  static add = async (Request: Request, Response: Response) => {
    try {
      //DESTRUCTURING
      const { idUsuario, nombreUsuario, contraseña, estado } = Request.body;

      //Validación de Datos de Entrada

      //Validación de Reglas de negocio
      const usuariosRepo = AppDataSource.getRepository(Usuario);
      const user = await usuariosRepo.findOne({
        where: { idUsuario: idUsuario },
      }); //El error estaba en "where: {Cedula}", se escribe: "Where:{Cedula:Cedula}"

      if (user) {
        return Response.status(404).json({ mensaje: "Cliente Existente" });
      }

      // const fecha = Date
      let usuario = new Usuario();
      usuario.idUsuario = idUsuario;
      usuario.nombreUsuario = nombreUsuario;
      usuario.contraseña = contraseña;
      usuario.estado = true;
      //VALIDAR CON CLASS VALIDATOR
      const errors = await validate(usuario, {
        validationError: { target: false, value: false },
      });
      if (errors.length > 0) {
        return Response.status(400).json(errors);
      }
      // cliente.FechaNacimiento=Date.now()
      await usuariosRepo.save(usuario);
      return Response.status(201).json({ mensaje: "Cliente Creado" });
    } catch (error) {
      return Response.status(404).json({ mensaje: error });
    }
  };
  static update = async (Request: Request, Response: Response) => {
    try {
      const idUsuario = parseInt(Request.params["id"]);
      if (!idUsuario) {
        return Response.status(404).json({ mensaje: "No se Indica el ID" });
      }
      const usuariosRepo = AppDataSource.getRepository(Usuario);
      let cliente;
      try {
        cliente = await usuariosRepo.findOneOrFail({ where: { idUsuario } });
        //DESTRUCTURING
        const userToUpdate = await usuariosRepo.findOneBy({ idUsuario });
        const { nombreUsuario, contraseña } = Request.body;
        const errors = await validate(userToUpdate, {
          validationError: { target: false, value: false },
        });
        if (errors.length > 0) {
          return Response.status(400).json(errors);
        }
        userToUpdate.nombreUsuario = nombreUsuario;
        userToUpdate.contraseña = contraseña;
        await usuariosRepo.save(userToUpdate);
        return Response.status(200).json({ mensaje: "Usuario Actualizado!" });
      } catch (error) {
        return Response.status(404).json({
          mensaje: "No se encontró el usuario con ese ID",
        });
      }
    } catch (error) {
      return Response.status(404).json({ mensaje: error });
    }
  };
  static delete = async (Request: Request, Response: Response) => {
    try {
      const idUsuario = parseInt(Request.params["id"]);
      if (!idUsuario) {
        return Response.status(404).json({ mensaje: "No se Indica el ID" });
      }
      const usuariosRepo = AppDataSource.getRepository(Usuario);
      let usuario: Usuario;
      try {
        usuario = await usuariosRepo.findOneOrFail({
          where: { idUsuario, estado: true },
        });
      } catch (error) {
        return Response.status(404).json({
          mensaje: "No se encontró el cliente con ese ID",
        });
      }
      usuario.estado = false;
      try {
        await usuariosRepo.save(usuario);
        return Response.status(200).json({ mensaje: "Cliente Eliminado!" });
      } catch (error) {
        return Response.status(400).json({ mensaje: "No se pudo Eliminar..." });
      }
    } catch (error) {
      return Response.status(404).json({ mensaje: error });
    }
  };
}
export default Usuario_Controller;

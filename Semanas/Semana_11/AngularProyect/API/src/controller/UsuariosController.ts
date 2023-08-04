import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Usuarios } from '../entity/Usuario';
import { validate } from 'class-validator';

class UsuariosController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const repoUsuario = AppDataSource.getRepository(Usuarios);
      const listaUsuario = await repoUsuario.find({ where: { estado: true } });

      if (listaUsuario.length == 0) {
        return resp
          .status(404)
          .json({ mensaje: 'No hay registros de usuarios' });
      }

      return resp.status(200).json(listaUsuario);
    } catch (error) {
      return resp
        .status(400)
        .json({ mensaje: 'Error desconocido. PAGUE 50MIL DOLARES' });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      const { cedula, nombre, apellido1, apellido2, correo, rol, contrasena } =
        req.body;

      // typescript
      const fecha = new Date();

      let usuario = new Usuarios();
      usuario.cedula = cedula;
      usuario.nombre = nombre;
      usuario.apellido1 = apellido1;
      usuario.apellido2 = apellido2;
      usuario.fecha_ingreso = fecha;
      usuario.correo = correo;
      usuario.contrasena = contrasena;
      usuario.rol = rol;
      usuario.estado = true;

      //validacion de datos de entrada
      const validateOpt = { validationError: { target: false, value: false } };
      const errores = await validate(usuario, validateOpt);

      if (errores.length != 0) {
        return resp.status(400).json(errores);
      }
      // reglas de negocio
      // valiando que el usuario o haya sido creado anteriormente
      const repoUsuario = AppDataSource.getRepository(Usuarios);
      let usuarioExist = await repoUsuario.findOne({
        where: { cedula: cedula },
      });
      if (usuarioExist) {
        resp.status(400).json({ mensaje: 'El usuario ya existe' });
      }

      // valiado que el correo no este registrado a algun usuario ya creado
      usuarioExist = await repoUsuario.findOne({ where: { correo: correo } });
      if (usuarioExist) {
        resp
          .status(400)
          .json({ mensaje: 'Ya existe un usuario registrado con el correo' });
      }

      usuario.hashPassword();

      try {
        await repoUsuario.save(usuario);
        return resp.status(201).json({ mensaje: 'Se ha creado el usuario' });
      } catch (error) {
        resp.status(400).json(error);
      }
    } catch (error) {
      resp.status(400).json({ mensaje: 'Error desconocido.' });
    }
  };
  static Update = async (req: Request, resp: Response) => {
    try {
      //DESTRUCTURING
      const { cedula, nombre } = req.body;

      //validacion de reglas de negocio
      const UsuariosRepo = AppDataSource.getRepository(Usuarios);
      let user: Usuarios;
      try {
        //Buscar por la marca mediante su cedula
        user = await UsuariosRepo.findOneOrFail({ where: { cedula } });
      } catch (error) {
        //Mensaje de error
        return resp.status(404).json({ mensaje: 'No existe el usuario.' });
      }
      //Actualizar nuevos cambios dentro de la entidad
      user.cedula = cedula;
      user.nombre = nombre;

      //validar con class validator
      const errors = await validate(user, {
        validationError: { target: false, value: false },
      });
      //Validación de errores
      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }
      //Manejo de excepción para guardar la información actualizada
      try {
        //Guardar información en la base de datos
        await UsuariosRepo.save(user);
        //Mensaje Informativo
        return resp.status(200).json({ mensaje: 'Se guardo correctamente' });
      } catch (error) {
        //Mensaje de error
        return resp.status(400).json({ mensaje: 'No pudo guardar.' });
      }
    } catch (error) {
      //Mensaje de error
      return resp.status(400).json(error);
    }
  };
  static delete = async (req: Request, resp: Response) => {
    //Manejo de execepciones general
    try {
      //Variable para guardar el id de la marca por borrar
      const cedula = req.params['cedula'];
      //Validación de id vacío
      if (!cedula) {
        return resp.status(404).json({ mensaje: 'Debe indicar la cedula' });
      }
      //Conexión a la base de datos
      const UsuariosRepo = AppDataSource.getRepository(Usuarios);
      let user: Usuarios;
      try {
        //Busqueda de la marca por id y estado:true
        user = await UsuariosRepo.findOneOrFail({
          where: { cedula, estado: true },
        });
      } catch (error) {
        //Mensaje de error
        return resp
          .status(404)
          .json({ mensaje: 'No se encuentra el usuario con dicha cedula' });
      }
      //Borrado lógico de la marca
      user.estado = false;
      try {
        //Guardar información
        await UsuariosRepo.save(user);
        //Mensaje informativo
        return resp.status(200).json({ mensaje: 'Se eliminó correctamente' });
      } catch (error) {
        //Mensaje de alerta
        return resp.status(400).json({ mensaje: 'No se pudo eliminar.' });
      }
    } catch (error) {
      //Mensaje de error
      return resp.status(400).json({ mensaje: 'No se pudo eliminar' });
    }
  };
}
export default UsuariosController;

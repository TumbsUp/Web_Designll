import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Cliente } from '../entity/Cliente';
import { Persona } from '../entity/Persona';
import { TipoCliente } from '../entity/TipoCliente';
import { validate } from 'class-validator';
import { Usuarios } from '../entity/Usuario';

class ClienteController {
  static getAll = async (req: Request, resp: Response) => {
    try {
      const clientRepo = AppDataSource.getRepository(Cliente);
      let lista;
      try {
        lista = await clientRepo.find({
          where: { estado: true },
          relations: { persona: true, tipoCliente: true },
        });
      } catch (error) {
        return resp.status(404).json({ mensaje: 'No se encontraron datos.' });
      }

      if (lista.length == 0) {
        return resp.status(404).json({ mensaje: 'No se encontraron datos.' });
      }

      return resp.status(200).json(lista);
    } catch (error) {
      return resp.status(400).json({ mensaje: 'Error al cargar datos.' });
    }
  };

  static add = async (req: Request, resp: Response) => {
    try {
      //DESTRUCTURING
      const {
        persona: { cedula, nombre, apellido1, apellido2, fechaNac },
        tipoCliente: { id },
      } = req.body;

      //validacion de reglas de negocio
      const personaRepo = AppDataSource.getRepository(Persona);
      const clienteRepo = AppDataSource.getRepository(Cliente);
      const tipCliente = AppDataSource.getRepository(TipoCliente);
      const cliente = await clienteRepo.findOne({ where: { cedula } });

      if (cliente) {
        return resp
          .status(404)
          .json({ mensaje: 'El producto ya existe en la base datos.' });
      }

      let tipoClient: TipoCliente;
      try {
        tipoClient = await tipCliente.findOneOrFail({
          where: { id },
        });
      } catch (error) {
        //Mensaje de advertencia
        return resp
          .status(404)
          .json({ mensaje: 'Tipo de Cliente inexistente' });
      }
      const fecha = new Date();

      let person = new Persona();
      (person.cedula = cedula),
        (person.nombre = nombre),
        (person.apellido1 = apellido1),
        (person.apellido2 = apellido2),
        (person.fechaNac = fechaNac);

      let clien = new Cliente();
      clien.cedula = cedula;
      clien.fechaIngreso = fecha;
      clien.tipoCliente = id;
      clien.estado = true;

      //validar con class validator
      const errors = await validate(person, {
        validationError: { target: false, value: false },
      });

      if (errors.length > 0) {
        return resp.status(400).json(errors);
      }

      await personaRepo.save(person);
      await clienteRepo.save(clien);
      return resp.status(201).json({ mensaje: 'Cliente Creado' });
    } catch (error) {
      return resp.status(400).json({ mensaje: error });
    }
  };

  static modify = async (req: Request, resp: Response) => {
    //Manejo de excepciones general
    try {
      //DESTRUCTURING
      const { nombre, apellido1 } = req.body;

      //validacion de reglas de negocio
      const UsuariosRepo = AppDataSource.getRepository(Usuarios);
      let user: Usuarios;
      try {
        //Buscar por la marca mediante su nombre
        user = await UsuariosRepo.findOneOrFail({ where: { nombre: nombre } });
      } catch (error) {
        //Mensaje de error
        return resp.status(404).json({ mensaje: 'No existe la marca.' });
      }
      //Actualizar nuevos cambios dentro de la entidad
      user.nombre = nombre;
      user.apellido1 = apellido1;

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
        return resp.status(404).json({ mensaje: 'No se encuentra el usuario' });
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
export default ClienteController;

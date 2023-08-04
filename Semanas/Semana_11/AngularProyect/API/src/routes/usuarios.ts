import { Router } from 'express';
import UsuariosController from '../controller/UsuariosController';

const routes = Router();

routes.post('/add', UsuariosController.add);
routes.get('/getAll', UsuariosController.getAll);
routes.patch('/update', UsuariosController.Update);
routes.delete('/:cedula', UsuariosController.delete);

export default routes;

import { Router } from 'express';
import ClienteController from '../controller/ClienteController';

const routes = Router();

routes.get('/getAll', ClienteController.getAll);
routes.post('/add', ClienteController.add);
routes.patch('/update', ClienteController.update);
routes.delete('/:cedula', ClienteController.delete);
export default routes;

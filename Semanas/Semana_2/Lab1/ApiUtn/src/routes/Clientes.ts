import { Router } from "express";
import Clientes_Controller from "../controller/Clientes_Controller";

const routes = Router();

routes.get('', Clientes_Controller.getAll);
routes.get('/:id', Clientes_Controller.getById);
routes.post('', Clientes_Controller.add);
routes.put('', Clientes_Controller.update);
routes.delete('', Clientes_Controller.delete);
export default routes;
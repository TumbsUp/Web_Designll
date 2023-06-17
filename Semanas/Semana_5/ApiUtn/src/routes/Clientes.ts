import { Router } from "express";
import Clientes_Controller from "../controller/Clientes_Controller";

const routes = Router();

routes.get('', Clientes_Controller.getAll);
routes.get('/getById/:id', Clientes_Controller.getById);
routes.post('/create', Clientes_Controller.add);
routes.put('/changeById/:id', Clientes_Controller.update);
routes.delete('/deleteById/:id', Clientes_Controller.delete);
export default routes;
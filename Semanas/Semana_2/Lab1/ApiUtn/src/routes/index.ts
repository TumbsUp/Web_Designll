import { Router } from "express";
import Clientes_Controller from "../controller/Clientes_Controller";
import Clientes from "./Clientes"
const routes = Router();

routes.use('/Clientes', Clientes);

export default routes
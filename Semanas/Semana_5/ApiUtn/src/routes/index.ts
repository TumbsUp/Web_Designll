import { Router } from "express";
import Clientes from "./Clientes";
import { Usuario } from "../entity/Usuario";
import Usuarios from "./Usuarios";
const routes = Router();

routes.use("/clientes", Clientes);
routes.use("/usuario", Usuarios);
export default routes;

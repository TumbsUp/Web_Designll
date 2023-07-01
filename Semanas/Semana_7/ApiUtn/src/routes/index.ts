import { Router } from "express";
import Clientes from "./Clientes";
import Usuarios from "./Usuarios";
import auth from "./auth";
import { checkjwt } from "../middleware/jwt";
import Factura from "./Factura";
import Productos from "./Productos";
const routes = Router();

routes.use("/clientes", Clientes);
routes.use("/usuarios", Usuarios);
routes.use("/auth", auth);
routes.use("/factura", Factura);
routes.use("/producto", Productos);
export default routes;

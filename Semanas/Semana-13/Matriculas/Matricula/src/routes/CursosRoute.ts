import { Router } from "express";
import CursosController from "../controller/CursosController";

const routes = Router();

routes.get("/getCursos", CursosController.getAll);
routes.post("/addCurso", CursosController.add);
export default routes;

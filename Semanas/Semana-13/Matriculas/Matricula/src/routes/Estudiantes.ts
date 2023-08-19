import { Router } from "express";
import EstudiantesController from "../controller/EstudiantesController";

const routes = Router();

routes.get("/getEstudiantes", EstudiantesController.getAll);
routes.post("/addEstudiante", EstudiantesController.add);
export default routes;

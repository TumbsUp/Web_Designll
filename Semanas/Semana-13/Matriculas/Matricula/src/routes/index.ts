import { Router } from "express";
import Estudiantes from "./Estudiantes";
import CursosRoute from "./CursosRoute";
import Matriculas from "./Matriculas";

const routes = Router();

routes.use("/Estudiantes", Estudiantes);
routes.use("/Cursos", CursosRoute);
routes.use("/Matricula", Matriculas);
export default routes;

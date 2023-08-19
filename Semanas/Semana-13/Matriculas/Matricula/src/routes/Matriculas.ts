import { Router } from "express";
import MatriculaController from "../controller/MatriculaController";

const routes = Router();

routes.get("/GetMatriculas", MatriculaController.getAll);
routes.post("/NewMatricula", MatriculaController.add);
routes.put("/updateMatricula/:id", MatriculaController.update);
routes.delete("/deleteMatricula/:id", MatriculaController.delete);

export default routes;

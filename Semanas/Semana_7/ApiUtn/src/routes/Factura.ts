import { Router } from "express";
import FacturaController from "../controller/FacturaController";
const routes = Router();
routes.get("/getFactura", FacturaController.getAll);
routes.get("/getFacturaById/:Numero", FacturaController.getById);
routes.post("/makeFactura", FacturaController.add);
routes.put("/updateFactura/:Numero", FacturaController.update);

export default routes;

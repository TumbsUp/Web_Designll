import { Router } from "express";
import FacturaController from "../controller/FacturaController";
const routes = Router();
routes.get("/getById/:id", FacturaController.getFactura);
// routes.post("/makeFactura", FacturaController.makeFactura);
// routes.put("/updateFactura", FacturaController.updateFactura);

export default routes;

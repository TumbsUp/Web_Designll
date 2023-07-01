import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
export const checkjwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers["token"];
  if (!token) {
    res.status(401).json("Acceso no autorizado");
  }
  let payload;
  try {
    payload.verify(token, "utnkey1234");
  } catch (error) {
    res.status(401).json("Acceso no autorizado");
  }

  res.locals.payload = payload;
  const { idUsuario } = payload;
  const newTocken = jwt.sign({ idUsuario }, "utnKey1234", { expiresIn: "5m" });
  res.setHeader("token", newTocken);
  next();
};

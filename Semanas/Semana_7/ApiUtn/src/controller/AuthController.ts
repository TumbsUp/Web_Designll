import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";
import * as jwt from "jsonwebtoken";
class AuthController {
  static login = async (req: Request, resp: Response) => {
    const { email, password } = req.body;
    try {
      if (!(email || password)) {
        return resp
          .status(400)
          .json({ mensaje: "Usuario o contraseña incorrecta." });
      }
      const repoUsuario = AppDataSource.getRepository(Usuario);
      let usuario: Usuario;
      try {
        usuario = await repoUsuario.findOneOrFail({ where: { email: email } });
      } catch (error) {
        return resp
          .status(400)
          .json({ mensaje: "Usuario o contraseña Incorrecta" });
      }
      if (!usuario.checkPassword(password)) {
        return resp
          .status(400)
          .json({ mensaje: "Usuario o contraseña incorrecta" });
      }
      const token = jwt.sign({ idUsuario: usuario.idUsuario }, "utnkey1234", {
        expiresIn: "5m",
      });
      return resp.status(200).json({
        token,
        role: usuario.rol,
        idUsuario: usuario.idUsuario,
      });
    } catch (error) {
      return resp.status(400).json({ error });
    }
  };
}
export default AuthController;

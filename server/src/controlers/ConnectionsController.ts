import { Request, Response } from "express";
import database from "../database/connection";

class ConnectionsController {
  async index(request: Request, response: Response) {
    try {
      const totalConnection = await database("connections").count("* as total");

      const { total } = totalConnection[0];

      return response.json({ total });
    } catch (error) {
      return response.json({ message: "Houve um erro no servidor" });
    }
  }

  async create(request: Request, response: Response) {
    const { user_id } = request.body;

    try {
      await database("connections").insert({ user_id });

      return response.status(201).send();
    } catch (error) {
      return response.json({ message: "Houve um erro no servidor" });
    }
  }
}

export default new ConnectionsController();

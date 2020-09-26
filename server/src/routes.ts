import { Router } from "express";
import ClassController from "./controllers/ClassController";
import ConnectionController from "./controllers/ConnectionController";

const routes = Router();

routes.post("/classes", ClassController.create);
routes.get("/classes", ClassController.index);

routes.post("/connections", ConnectionController.create);
routes.get("/connections", ConnectionController.index);

export default routes;

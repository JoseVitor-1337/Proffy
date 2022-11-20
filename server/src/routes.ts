import { Router } from "express";

import ClassesControllers from "./controlers/ClassesControllers";
import ConnectionsController from "./controlers/ConnectionsController";

const routes = Router();

routes.post("/classes", ClassesControllers.create);
routes.get("/classes", ClassesControllers.index);

routes.post("/connections", ConnectionsController.create);
routes.get("/connections", ConnectionsController.index);

export default routes;

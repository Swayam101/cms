import { Router } from "express";
import controllers from "../controllers";

const baseRouter = Router();

baseRouter.get("/", controllers.healthCheck);

export default baseRouter;
